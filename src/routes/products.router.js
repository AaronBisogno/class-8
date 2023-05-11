import express from "express";
import ProductManager from "../ProductManager.js";

export const productsRouter = express.Router();
const productManager = new ProductManager("../products.json")

productsRouter.get('/', async (req, res) => {
    const countLimit = req.query.limit;
    const products = await productManager.getProducts();
    if(countLimit){
        const limit = parseInt(countLimit); 
        const result = products.slice(0, limit);
        return res.status(200).send({result});
    } else return res.status(200).send({products}); 
})
productsRouter.get('/:pid', async (req, res) => {
    const productId = req.params.pid;
    if(productId){
        const id = parseInt(productId);
        const result = await productManager.getProductById(id);
        res.status(200).send({result})
    } else res.status(404).send({status: "error", msg: "Product not found." })
})
productsRouter.post('/', async (req, res) => {
    const newProduct = await productManager.addProduct(req.body);
    if (newProduct) {
        res.status(200).send({newProduct});
    } else {
        res.status(400).send(newProduct);
    }
})

productsRouter.put('/:pid', async (req, res) => {
    const productid = req.params.pid;
    const newInfo = req.body
    const updatedProduct = productManager.updateProduct(productid, newInfo);
    if(updatedProduct){
        res.status(200).send({updatedProduct})
    } else res.status(400).send({updatedProduct})
})
