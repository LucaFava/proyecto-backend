import { Router } from "express"
import { __dirname } from "../utils.js"
import { ProductController } from "../controllers/products.controller.js" 

const router = Router()


// ruta get para mostrar todos los productos, o un limite de productos
router.get("/", ProductController.getProducts)

// ruta get para pedir por id un solo producto
router.get("/:pid", ProductController.getProductId)

// ruta post para agregar un producto al json de productos
router.post("/", ProductController.createProducts)

// ruta para actualizar un producto
router.put("/:pid", ProductController.updateProducts)


 //ruta para eliminar un producto
 router.delete("/:pid", ProductController.deleteProduct)











export {router as prodRouter}