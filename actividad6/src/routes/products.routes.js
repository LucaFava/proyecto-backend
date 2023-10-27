import { Router } from "express"
import { productsService } from "../persistence/index.js"
import fs from "fs"
import { __dirname } from "../utils.js"


const router = Router()


// ruta get para mostrar todos los productos, o un limite de productos
router.get("/", async(req, res) => {
    try {
        const result = await productsService.getProduct()
        res.json({status: "success", data: result})
    } catch (error) {
        res.json({status: "error", message: error.message})
    }
})

// ruta get para pedir por id un solo producto
router.get("/:pid", async(req,res)=>{
    try {
        const id = parseInt(req.params.pid)
        // const product = await productsService.getProductsById(id)
        //  res.json(product)
         const products = await productsService.getProduct()
         const prodId = products.find((p)=> p.id === id)
         if (prodId) {
             res.json(prodId)
         } else {
             res.json({status:"error", message:error.message})
         }
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
})

// ruta post para agregar un producto al json de productos
router.post("/", async(req,res)=> {
    try {
        const prodInfo = req.body
        const result = await productsService.addProd(prodInfo)
        res.json({status: "success", data: result})
    } catch (error) {
        res.json({status:"error", message:error.message});
    }

})

// ruta para actualizar un producto
router.put("/:pid", async(req,res)=>{
    try {
        const id = req.params.pid;
        const newInfo = req.body;

        const result = await productsService.updateProd(id, newInfo)
        res.json({status: "success", data: result})
    } catch (error) {
        res.json({message:error.message})
    }
})


 //ruta para eliminar un producto
 router.delete("/:pid", async(req,res)=>{
    try {
        const id = req.params.pid;

        const result = await productsService.updateProd(id)
        res.json({status: "success", data: result})
    } catch (error) {
        res.json({message:error.message})
    }
 })











export {router as prodRouter}