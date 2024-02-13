import { Router } from "express"
import { CartsController } from "../controllers/carts.controller.js" 

const router = Router()

// ruta para mostrar todos los carritos 
router.get("/", CartsController.getCarts)
// ruta para buscar un carrito por id
router.get("/:cid", CartsController.getCartById)

// ruta para crear un carrito
router.post("/", CartsController.createCart)

// ruta para agregar un producto al carrito
router.post("/:cid/product/:pid", CartsController.addProd)

// ruta para eliminar un produto de un carrito
router.delete("/:cid/product/:pid", CartsController.deleteProd);

// ruta para cambiar la cantidad de un producto
router.put("/:cid/product/:pid", CartsController.updateProd)
export {router as cartsRouter}