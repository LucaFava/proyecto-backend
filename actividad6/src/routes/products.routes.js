import { Router } from "express"
import { productsService } from "../persistence/index.js"


const router = Router()


// ruta get para mostrar todos los productos, o un limite de productos
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

// ruta para actualizar un producto
router.put("/:pid", async(req,res)=>{
    try {
        const id = parseInt(req.params.pid);
        const newInfo = req.body;
        let products = await productsService.getProduct()
        const prodIndex = products.findIndex(p=>p.id === id)
        if (prodIndex>=0) {
            let newProdActualiced = [...products]
            console.log(newProdActualiced);
            newProdActualiced[prodIndex]=newInfo;
            products = newProdActualiced
            
            res.json({message:"usuario actualizado"})
        } else {
            res.json({message:"el producto no existe"})
        }
    } catch (error) {
        res.json({message:error.message})
    }
})


 //ruta para eliminar un producto
 router.delete("/:pid", async(req,res)=>{
    try {
        const id = parseInt(req.params.pid)
        let productDelete = await productsService.deleteProd(id)
        if (productDelete) {
            res.json({message : "producto eliminado"})
        } else {
            res.json({message : "el producto no existe"})
        }
    } catch (error) {
        res.json({message:error.message})        
    }
 })











export {router as prodRouter}