import express from 'express'
import cors from 'cors'
import { conexao } from '../server.js'
const app = express()

//routes
import productsRoute from './routes/productsRoute.js'
import usersRoute from './routes/usersRoute.js'

//para o express ler json
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send("Servidor Funcionando")
})


//definir rotas
app.use('/', productsRoute)
app.use('/', usersRoute)

export default app