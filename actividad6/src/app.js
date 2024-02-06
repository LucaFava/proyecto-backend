import express from "express";


import { prodRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";

import { __dirname } from "./utils.js";
import path from "path"

import { engine } from "express-handlebars"

import { Server } from "socket.io"
import { cartsService } from "./persistence/index.js";
import { ProductsService } from "./services/products.service.js"; 

import { viewsRouter } from "./routes/views.routes.js";
import { connectDB } from "./config/dbConnection.js";
import { sessionsRouter } from "./routes/sessions.routes.js";

import passport from "passport"
import { initializatePassword } from "./config/passport.config.js";
import cookieParser from "cookie-parser"

// const managerProductService =  new ProductManager("../productos.json")
// console.log(productsService);
const port = process.env.PORT || 8080

const app = express()

const httpServer = app.listen(port, () => console.log("servidor funcionando")) 

// servidor de websocket
const io = new Server(httpServer)


//conexión base de datos
connectDB();

// middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, "/public")))
app.use(cookieParser())
// config de handlebars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, "/views"));


// config de passport
initializatePassword()
app.use(passport.initialize());

// routes principales
app.use(viewsRouter)
app.use("/api/products", prodRouter)
app.use("/api/carts", cartsRouter)
app.use("/api/sessions",sessionsRouter)




// socket configuracion
io.on("connection", async(socket)=>{
    console.log("cliente conectado");
    const products = await ProductsService.getProds()

    socket.emit("products", products)

    // recibir el prod del socketClient
    socket.on("addProd", async(data)=>{
        // agregamos el prod
        await productsService.addProd(data)
        // volvemos a enviar todos los productos
       const products = await productsService.getProduct()
       
       io.emit("products", products)
    })

    // recibir producto agregado

    socket.on("addProdCart", async(data)=>{
        console.log(data);
        // agrego al carrito mediante el metodo
        const result = await cartsService.addProdCart("653ea55a0eef0ebbc9ac2e49", data);
        console.log(result);
    })
})






