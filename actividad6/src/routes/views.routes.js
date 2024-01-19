import { Router } from "express";
import { productsService } from "../persistence/index.js";
import { cartsService } from "../persistence/index.js";

const router = Router()

// ruta para la view de home
router.get("/", async(req, res)=>{
    // el "4" y el "1" son lo valores que le dor por defecto en caso de que el cliente no indique la cantidad
    const {limit=4, page=1} = req.query;
    // aca pondriamos los filtros
    const query = {}
    const options = {
        limit,
        page,
        sort:{price:1},
        lean: true
    }
    const products = await productsService.getProductPaginate(query, options);
    const baseUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    const dataProducts = {
        status:"success",
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.hasPrevPage ? `${baseUrl.replace(`page=${products.page}`, `page=${products.prevPage}`)}` : null,
        nextLink:  products.hasNextPage ? baseUrl.includes("page") ?
        baseUrl.replace(`page=${products.page}`, `page=${products.nextPage}`) : baseUrl.concat(`?page=${products.nextPage}`) : null

    }
    
    // console.log(dataProducts);
    res.render("home", dataProducts)
});
// ruta para la view de los productos en tiempo real
router.get("/realtimeproducts", (req, res)=>{
    res.render("realTime")
});

// ruta para la view del carrito
router.get("/carts/:cid", async(req, res)=>{
    const idCart = req.params.cid
    const prodsCarts = await cartsService.getCartById(idCart)
    const dataProds = prodsCarts.products

    // console.log(dataProds);
    res.render("cart", {dataProds})
    
});

// ruta view para el registro
router.get("/signup",(req,res)=>{
    res.render("signUp")
});

// ruta view para iniciar sesión
router.get("/login",(req,res)=>{
    res.render("login")
});

// profile
router.get("/profile",(req,res)=>{
    res.render("profile", {user:req.user})
    
    // if (req.user) {
    //     const userEmail = req.user
    //     console.log(userEmail);
    //     res.render("profile", {userEmail})
    // } else {
    //     res.redirect("/login")
    // }
})



export {router as viewsRouter}