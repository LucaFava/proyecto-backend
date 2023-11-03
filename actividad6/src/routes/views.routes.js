import { Router } from "express";
import { productsService } from "../persistence/index.js";
import { cartsService } from "../persistence/index.js";

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
    // console.log(dataProducts);
    res.render("home",  dataProducts)
})
// ruta para la view de los productos en tiempo real
router.get("/realtimeproducts", (req, res)=>{
    res.render("realTime")
})

// ruta para la view del carrito
router.get("/carts/:cid", async(req, res)=>{
    const idCart = req.params.cid
    const prodsCarts = await cartsService.getCartById(idCart)
    const dataProds = prodsCarts.products

    // console.log(dataProds);
    res.render("cart", {dataProds})
    
})


export {router as viewsRouter}