import express from 'express';
import app from '../index.js';
const router = express.Router();
import { conexao } from '../../server.js';

router.post('/checkout/add-item', async(req, res) => {
    const {userId, productId, quantity, price} = req.body

    const subtotal = price * quantity

    try {
        // 1. verificar se ha um pedido 'pending' para o usuario
        const pendingOrderQuery = "SELECT * FROM orders WHERE user_id = ? AND status = 'pending'";
        conexao.query(pendingOrderQuery, [userId], (err, orders) => {
            if(err){
                console.error("Erro ao buscar pedido pendente.", err);
                return res.status(500).json({message: "Erro ao buscar pedido pendente."})
            }

            let orderId;

            // 2. Se houver um pedido pendente, usar o mesmo; senao, criar um novo pedido
            if(orders.length > 0) {
                orderId = orders[0].idorders;
            } else {
                const createOrderQuery = "INSERT INTO orders (user_id, total_price, status, created_at) VALUES (?, 0, 'pending', NOW())";
                conexao.query(createOrderQuery, [userId], (err, result) => {
                    if(err){
                        console.error("Erro ao criar pedido:", err);
                        return res.status(500).json({message: "Erro ao criar o pedido"});
                    }
                    orderId = result.insertId
                    inserirItemEAtualizarPedido(orderId)
                });
                return;
            }

            //se o pedido pendente ja existir, insere o item  e atualiza o pedido
            inserirItemEAtualizarPedido(orderId);
        });

        //funcao auxiliar para inserir o item e atualizar o total do pedido
        const inserirItemEAtualizarPedido = (orderId) => {
            const checkItemQuery = "SELECT * FROM order_items WHERE order_id = ? AND product_id = ?";

            conexao.query(checkItemQuery, [orderId, productId], (err, items) => {
                if(err){
                    console.error("Erro ao verificar item do pedido:", err)
                    return res.status(500).json({message: "Erro ao verificar item no pedido"});
                }

                if(items.length > 0){
                    const existingItem = Array.isArray(items) ? items[0] : items;
                    const newQuantity = existingItem.quantity + quantity;
                    const newSubtotal = price * newQuantity
                    const updateItemQuery = "UPDATE order_items SET quantity = ?, subtotal = ? WHERE order_id = ? AND product_id = ?";
                    conexao.query(updateItemQuery, [newQuantity, newSubtotal, orderId, productId], (err, result) => {
                        if(err){
                            console.error("Erro ao atualizar o item do pedido:", err)
                            return res.status(500).json({message: "Erro ao atualizar item do pedido"});
                        }
                        atualizarTotalDoPedido(orderId);
                    })
                }else{
                    const insertItemQuery = "INSERT INTO order_items (order_id, product_id, quantity, subtotal) VALUES (?, ?, ?, ?)";
                    conexao.query(insertItemQuery, [orderId, productId, quantity, subtotal], (err, result) => {
                        if(err){
                            console.error("Erro ao inserir item do pedido:", err)
                            return res.status(500).json({message: "Erro ao inserir item do pedido."});
                        }
                        atualizarTotalDoPedido(orderId);
                    });
                }
            })
        };

        const atualizarTotalDoPedido = (orderId) => {
            const updateTotalQuery = `
                UPDATE orders
                SET total_price = (
                    SELECT SUM(subtotal) FROM order_items WHERE order_id = ?
                )
                WHERE idorders = ?
            `;

            conexao.query(updateTotalQuery, [orderId, orderId], (err, result) => {
                if(err){
                    console.error("Erro ao atualizar total do pedido:", err);
                    return res.status(500).json({message: "Erro ao atualizar total do pedido"});
                }

                const getOrderQuery = "SELECT * FROM orders WHERE idorders = ?";
                conexao.query(getOrderQuery, [orderId], (err, result) => {
                    if(err){
                        console.error("Erro ao buscar pedido atualizado:", err)
                        res.status(500).json({message: "Erro ao buscar pedido atualizado"});
                    }
                    res.status(200).json({
                        message: "Item adicionado e pedido atualizado com sucesso",
                        order: result[0]
                    })
                })
            })
        }
    } catch (error){
        console.error("Erro no endpoint de checkout", error)
        res.status(500).json({message: "Erro interno do servidor"});
    }
});

export const queryPromise = (sql, params) => {
    return new Promise((resolve, reject) => {
        conexao.query(sql, params, (error, results) => {
            if(error) return reject(error);
            resolve(results)
        })
    })
}

router.get('/checkout/:userId', async(req, res) => {
    const { userId } = req.params;

    try {
        const [orders] = await queryPromise(
            "SELECT * FROM orders WHERE user_id = ? AND status = 'pending' ORDER BY created_at DESC LIMIT 1", [userId]
        );

        if(orders.length === 0){
            return res.status(404).json({message: "Nenhum pedido encontrado"});
        }

        const order = orders;

        const orderItems = await queryPromise(
            `SELECT order_items.*, products.name, products.image_url, products.price
            FROM order_items
            JOIN products ON order_items.product_id = products.idproducts
            WHERE order_items.order_id = ?`, [order.idorders]
        );

        console.log(orderItems)

        res.status(200).json({
            order,
            items: orderItems
        })
    } catch (error) {
        console.error("Erro ao buscar pedido:", error);
        res.status(500).json({message: "Erro ao buscar pedido"});
    }
})

router.delete('/checkout/:userId', async(req, res) => {
    const {userId, productId} = req.body

    console.log(productId)

    const deleteItemQuery = "DELETE order_items FROM order_items JOIN orders ON order_items.order_id = orders.idorders WHERE orders.user_id = ? AND order_items.product_id = ? AND orders.status = 'pending'"

    conexao.query(deleteItemQuery, [userId, productId], (err, result) => {
        if(err){
            console.error("Erro ao deletar o pedido:", err);
            return res.status(500).json({message: "Erro ao deletar o pedido"});
        }
    })

    const updateTotalQuery = "UPDATE orders SET total_price = (SELECT COALESCE(SUM(order_items.subtotal), 0) FROM order_items WHERE order_items.order_id = orders.idorders) WHERE orders.user_id = ? AND orders.status = 'pending'"

    conexao.query(updateTotalQuery, [userId], (err, result) => {
        if(err){
            console.error("Erro ao atualizar o total do pedido:", err);
            return res.status(500).json({message: "Erro ao atualizar o total do pedido"});
        }
        res.status(200).json({message: 'sucesso ao remover o produto e atualizar o pedido', result})
    })
})

export default router