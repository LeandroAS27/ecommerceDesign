import express from 'express'
import cors from 'cors'
import { conexao } from '../server.js'
import productsRoute from './routes/productsRoute.js'
const app = express()

//para o express ler json
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send("Servidor Funcionando")
})


//definir rotas
app.use("/", productsRoute)

export default app