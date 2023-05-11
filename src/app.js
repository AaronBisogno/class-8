import express from 'express';
import { cartRouter } from './routes/cart.router.js';
import { productsRouter } from './routes/products.router.js';
import * as fs from "fs"
import ProductManager from "./ProductManager.js";

const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${port}`)
})
