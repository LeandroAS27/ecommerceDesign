import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { conexao } from '../../server.js';

const router = express.Router();

router.get('/users', (req, res) => {
    const sql = "SELECT * from users"

    conexao.query(sql, (error, result) => {
        if(error){
            return res.status(500).json({message: "Erro ao buscar usuarios"})
        }
        res.status(200).json({message: "Sucesso ao buscar usuarios", result})
    })
})

//cadastro do usuario
router.post('/users', async(req, res) => {
    const {userName, email, password} = req.body

    //gerar senha hash
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?);"
    const values = [userName, email, hashedPass];

    conexao.query(sql, values, (error, result) => {
        if(error){
            return res.status(500).json({message: "Erro ao cadastrar o usuario"})
        }
        res.status(200).json({message: "Sucesso ao cadastrar usuario", result})
    })
})

//fazer login do usuario
router.post('/login', (req, res) => {
    const {email, password} = req.body

    const sql = "SELECT * from users WHERE email = ?"

    conexao.query(sql, [email], async(error, result) => {
        if(error){
            return res.status(500).json({message: "Erro no servidor"})
        }

        if(result.length === 0){
            return res.status(401).json({message: "Usuario ou senha incorretos."})
        }

        const user = result[0];

        //comparar a senha digitada com a do banco
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({message: "Usuario ou senha incorretos."})
        }

        //gerar token jwt
        const token = jwt.sign({id: user.id, name: user.name, email: user.email, password: user.password, role: user.role}, process.env.JWT_SECRET, ({expiresIn: '1hr'}))

        res.status(200).json({message: "Sucesso ao logar o usuario", token, user:{
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }})
    })
})


export default router


















//rota para sign in e sign up do usuario