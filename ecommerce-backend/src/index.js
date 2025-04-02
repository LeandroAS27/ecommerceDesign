import express from 'express'
import cors from 'cors'
import multer from 'multer'
import path from 'path'
const app = express()

//routes
import productsRoute from './routes/productsRoute.js'
import usersRoute from './routes/usersRoute.js'
import typeProductsRoute from './routes/typeProductsRoute.js'
import checkoutRoute from './routes/checkoutRoute.js'

//para o express ler json
app.use(express.json({limit: '10mb'}))
app.use(express.urlencoded({limit: '10mb', extended: 'true'}))
app.use(cors())

const uploadPath = path.resolve(process.cwd(), '../ecommerce-frontend/public/upload')
app.use('/uploads', express.static(uploadPath))


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname,"../../ecommerce-frontend/public/upload"))
    },
    filename: (req, file, cb) => {
        const cleanFileName = file.originalname.replace(/[^a-zA-Z0-9.]/g, "_");
        cb(null, Date.now() + '-' + cleanFileName)
    }
})

const upload = multer({storage})


app.get('/', (req, res) => {
    res.send("Servidor Funcionando")
})


//definir rotas
app.use(productsRoute)
app.use(usersRoute)
app.use(typeProductsRoute)
app.use(checkoutRoute)

export default app