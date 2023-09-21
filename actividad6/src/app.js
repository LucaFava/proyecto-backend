import express from "express"
import { ProductManager } from "./persistence/productManager.js";

import { prodRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";

import { __dirname } from "./utils.js";
import { productsService } from "./persistence/index.js";

// const managerProductService =  new ProductManager("../productos.json")
console.log(productsService);
const port = 8080

const app = express()

app.listen(port, () => console.log("servidor funcionando")) 

app.use(express.static("public"))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// routes
app.use("/api/products", prodRouter)
app.use("/api/carts", cartsRouter)








// rutas del servidor
// app.get("/products", async(req, res) => {
//     try {
//         const products = await managerProductService.getProduct()
//         const { limit } = req.query;
//         const limitNumber = parseInt(limit)
//         if (limit) {
//             const productsLimit = products.slice(0,limitNumber)
//             res.send(productsLimit)
//         } else {
//             res.send(products)
//         }
        
//     } catch (error) {
//         res.send(error.message)
//     }
// })
// ruta para pedir por id
// app.get("/products/:pid", async(req, res)=> {
//     try {
//         const id = parseInt(req.params.pid)
//         const products = await managerProductService.getProduct()
//         const prodId = products.find((p)=> p.id === id)

//         if (prodId) {
//             res.send(prodId)
//         } else {
//             console.log("no se pudo encontrar el producto solicitado");
//         }
//     } catch (error) {
//         console.log(error.message);
//     }
// })