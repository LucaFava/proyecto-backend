import { Router } from "express";
import { productsService } from "../persistence/index.js";


const router = Router()

// ruta para la view de home
router.get("/", async(req, res)=>{
    const products = await productsService.getProductPaginate()
    const dataProducts = {
        status:"success",
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.prevLink,
        nextLink: products.nextLink

    }
    res.render("home",  dataProducts)
})
// ruta para la view de los productos en tiempo real
router.get("/realtimeproducts", (req, res)=>{
    res.render("realTime")
})




export {router as viewsRouter}