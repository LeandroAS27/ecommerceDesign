import express from 'express';
import { conexao } from '../../server.js';
import path from 'path'

const router = express.Router();
const __dirname = path.resolve();

router.get('/media/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, 'public/images', imageName);
    console.log(imagePath)
    res.sendFile(imagePath);
})

export default router