import express from 'express';
import { conexao } from '../../server.js';

const router = express.Router();

router.get('/order', (req, res) => {
    const orderQuery = "SELECT * FROM bdcommerce.orders"

    conexao.query(orderQuery, (err, result) => {
        if(err){
            console.error("Erro ao buscar pedido:", err);
            return res.status(500).json({message: "Erro ao buscar o pedido"});
        }
        res.status(200).json({message: "Busca realizada com sucesso", result})
    })
})

export default router;