import express from 'express'
import cors from 'cors'
const app = express()

//routes
import productsRoute from './routes/productsRoute.js'
import usersRoute from './routes/usersRoute.js'
import typeProductsRoute from './routes/typeProductsRoute.js'
import checkoutRoute from './routes/checkoutRoute.js'
import cartRoute from './routes/cartRoute.js'
import imagesRoute from './routes/imagesRoute.js'
import orderDetailsRoute from './routes/orderDetailsRoute.js'

//para o express ler json
app.use(express.json({limit: '10mb'}))
app.use(express.urlencoded({limit: '10mb', extended: 'true'}))
app.use(cors())

// app.use('/media', express.static(path.join(__dirname, 'public/images')));


app.get('/', (req, res) => {
    res.send("Servidor Funcionando")
})


//definir rotas
app.use(productsRoute)
app.use(usersRoute)
app.use(typeProductsRoute)
app.use(checkoutRoute)
app.use(cartRoute)
app.use(imagesRoute)
app.use(orderDetailsRoute)

export default app