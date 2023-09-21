import { Router } from "express"
import { ProductManager } from "../persistence/productManager.js"

const productsService = new ProductManager("./productos.json")

const router = Router()

router.get("/", async(req, res) => {
    try {
        const products = await productsService.getProduct()
        const { limit } = req.query;
        const limitNumber = parseInt(limit)
        if (limit) {
            const productsLimit = products.slice(0,limitNumber)
            res.json({data:productsLimit})
        } else {
            res.json({data:products})
        }
     
    } catch (error) {
        res.send(error.message)
    }
})

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

router.post("/", async(req,res)=> {
    try {
        const prodInfo = req.body

            if (prodInfo) {
                await productsService.addProd(prodInfo)
                await res.json({message:"producto agregado"})
            } else {
                res.json({message:"no se pudo agregar el producto"})
            }

    } catch (error) {
        res.json({status:"error", message:error.message});
    }

})













export {router as prodRouter}