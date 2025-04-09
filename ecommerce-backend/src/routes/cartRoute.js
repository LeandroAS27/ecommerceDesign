import express from 'express';
import { conexao } from '../../server.js';
import { queryPromise } from './checkoutRoute.js';

const router = express.Router();

router.post('/checkout/add-item/cart', async(req, res) => {
    const { userId, items } = req.body

    if(!items || items.length === 0){
        return res.status(400).json({message: "Nenhum item foi enviado"})
    }

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
                inserirItemEAtualizarPedido(orderId, items);
            } else {
                const createOrderQuery = "INSERT INTO orders (user_id, total_price, status, created_at) VALUES (?, 0, 'pending', NOW())";
                conexao.query(createOrderQuery, [userId], (err, result) => {
                    if(err){
                        console.error("Erro ao criar pedido:", err);
                        return res.status(500).json({message: "Erro ao criar o pedido"});
                    }
                    orderId = result.insertId
                    inserirItemEAtualizarPedido(orderId, items);
                });
                return;
            }
        });

        //funcao auxiliar para inserir o item e atualizar o total do pedido
        const inserirItemEAtualizarPedido = (orderId, items) => {
            let processedItems = 0;

            items.forEach((item) => {
                const {productId, quantity, price} = item;
                const subtotal = price * quantity;


                const checkItemQuery = "SELECT * FROM order_items WHERE order_id = ? AND product_id = ?";
                conexao.query(checkItemQuery, [orderId, productId], (err, existingItems) => {
                    if(err){
                        console.error("Erro ao verificar item do pedido:", err)
                        return res.status(500).json({message: "Erro ao verificar item no pedido"});
                    }
    
                    if(existingItems.length > 0){
                        const existingItem = Array.isArray(existingItems) ? existingItems[0] : existingItems;
                        const newQuantity = existingItem.quantity + quantity;
                        const newSubtotal = price * newQuantity;

                        const updateItemQuery = "UPDATE order_items SET quantity = ?, subtotal = ? WHERE order_id = ? AND product_id = ?";
                        conexao.query(updateItemQuery, [newQuantity, newSubtotal, orderId, productId], (err) => {
                            if(err){
                                console.error("Erro ao atualizar o item do pedido:", err)
                                return res.status(500).json({message: "Erro ao atualizar item do pedido"});
                            }
                            processedItems++;
                            if(processedItems === items.length){
                                atualizarTotalDoPedido(orderId);
                            }
                        });
                    }else{
                        const insertItemQuery = "INSERT INTO order_items (order_id, product_id, quantity, subtotal) VALUES (?, ?, ?, ?)";
                        conexao.query(insertItemQuery, [orderId, productId, quantity, subtotal], (err) => {
                            if(err){
                                console.error("Erro ao inserir item do pedido:", err)
                                return res.status(500).json({message: "Erro ao inserir item do pedido."});
                            }
                            processedItems++
                            if(processedItems === items.length){
                                atualizarTotalDoPedido(orderId);
                            }
                        });
                    }
                })
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

            conexao.query(updateTotalQuery, [orderId, orderId], (err) => {
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

export default router