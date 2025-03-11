import { createConnection } from "mysql";
import dotenv from 'dotenv';
import app from './src/index.js'

dotenv.config();

const port = process.env.PORT || 5000;

export const conexao = createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE
});

conexao.connect((error) => {
    if(error){
        console.log("Erro ao conectar no banco de dados")
    }
    app.listen(port, () => {
        console.log(`servidor funcionando na porta ${port}`)
    })
})