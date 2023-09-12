import express from "express"
import { ProductManager } from "./persistence/productManager.js";

const managerProductService =  new ProductManager("../productos.json")
console.log(managerProductService);
const port = 8080

const app = express()

app.listen(port, () => console.log("servidor funcionando")) 

// rutas del servidor
app.get("/products", async(req, res) => {
    try {
        const products = await managerProductService.getProduct()
        const { limit } = req.query;
        const limitNumber = parseInt(limit)
        if (limit) {
            const productsLimit = products.slice(0,limitNumber)
            res.send(productsLimit)
        } else {
            res.send(products)
        }
        
    } catch (error) {
        res.send(error.message)
    }
})
// ruta para pedir por id
app.get("/products/:pid", async(req, res)=> {
    try {
        const id = parseInt(req.params.pid)
        const products = await managerProductService.getProduct()
        const prodId = products.find((p)=> p.id === id)

        if (prodId) {
            res.send(prodId)
        } else {
            console.log("no se pudo encontrar el producto solicitado");
        }
    } catch (error) {
        console.log(error.message);
    }
})