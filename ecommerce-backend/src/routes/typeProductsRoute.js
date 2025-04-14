import express from 'express';
import { conexao } from '../../server.js';
const router = express.Router();

//busca por tipo de roupa
router.get('/products/type', (req, res) => {
    const { type } = req.query;
    let sql = "SELECT * FROM bdcommerce.products";
    let params = [];

    if(type){
        sql += " WHERE LOWER(type) = LOWER(?)"
        params.push(type)
    }

    conexao.query(sql, params, (error, results) => {
        if(error){
            console.error("Erro ao buscar os dados:", error)
            return res.status(500).json({message: "Erro ao buscar os dados no servidor"})
        }
        res.status(200).json({message: "Busca feita com sucesso", result: results})
    })
})

export default router;