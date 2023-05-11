import express from 'express';
import { cartRouter } from './routes/carts.router.js';
import { productsRouter } from './routes/products.router.js';

const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${port}`)
})

app.use('*', (req, res) =>{
    res.status(404).send({msg: "Route not found"});
})
