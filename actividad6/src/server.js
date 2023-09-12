import express from "express"
import { ProductManager } from "./persistence/productManager.js";

const managerProductService =  new ProductManager("./productos.json")
console.log(managerProductService);
const port = 8080

const app = express()

app.listen(port, () => console.log("servidor funcionando")) 

// rutas del servidor
app.get("/products", async(req, res) => {
    try {
        const limit = req.query.limit
        const products = await managerProductService.getProduct()
        
        res.send(products)
    } catch (error) {
        res.send(error.message)
    }
})