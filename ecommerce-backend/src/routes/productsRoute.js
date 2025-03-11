import express from 'express';
import app from '../index.js'
const router = express.Router();
import { conexao } from '../../server.js';

router.get('/products', (req, res) => {
    const sql = "SELECT * FROM bdcommerce.products"

    conexao.query(sql, (error, result) => {
        if(error){
            console.log("Erro ao buscar os dados")
            return res.status(500).json({message: "Erro ao buscar os dados no servidor"})
        }
        res.status(200).json({message: "Busca feita com sucesso", result})
    })
})

//tem que ser uma rota autenticada para o admin adicionar os produtos
router.post('/products', (req, res) => {
    const {name, description, price, category_idcategories, stock, image_url} = req.body

    const sql = "INSERT INTO `bdcommerce`.`products` (`name`, `description`, `price`, `category_idcategories`, `stock`, `image_url`) VALUES (?, ?, ?, ?, ?, ?)";

    const values = [name, description, price, category_idcategories, stock, image_url]

    conexao.query(sql, values, (error, result) => {
        if(error){
            console.log("Erro ao inserir o novo produto", error)
            return res.status(500).json({message: "Erro ao inserir o novo produto", error})
        }
        res.status(201).json({message: "Produto adicionado com sucesso", result})
    })
})


export default router