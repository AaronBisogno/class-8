import express from "express";
import * as fs from "fs"
// import CartManager from "../CartManager.js";

export const cartRouter = express.Router();


cartRouter.post('/', (req, res) => {})
cartRouter.get('/:cid', (req, res) => {})
cartRouter.post('/:cid/product/:pid', (req, res) => {})


