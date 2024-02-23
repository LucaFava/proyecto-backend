import { Router } from "express"
import { __dirname } from "../utils.js"
import { ProductController } from "../controllers/products.controller.js" 
import { checkRole, isAuth } from "../middlewares/auth.js" 


const router = Router()


// ruta get para mostrar todos los productos, o un limite de productos
router.get("/", ProductController.getProducts)

// ruta get para pedir por id un solo producto
router.get("/:pid", ProductController.getProductId)

// ruta post para crear un producto
router.post("/", checkRole(["admin"]) ,ProductController.createProducts)

// ruta para actualizar un producto
router.put("/:pid", checkRole(["admin"]) ,ProductController.updateProducts)


 //ruta para eliminar un producto
 router.delete("/:pid", checkRole(["admin"]) ,ProductController.deleteProduct)











export {router as prodRouter}