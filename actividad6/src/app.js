import express from "express"

import { prodRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";

import { __dirname } from "./utils.js";
import path from "path"

import { engine } from "express-handlebars"

import { Server } from "socket.io"
import { productsService } from "./persistence/index.js";

import { viewsRouter } from "./routes/views.routes.js";

// const managerProductService =  new ProductManager("../productos.json")
// console.log(productsService);
const port = 8080

const app = express()

const httpServer = app.listen(port, () => console.log("servidor funcionando")) 

// servidor de websocket
const io = new Server(httpServer)


// ruta de las views
app.use(viewsRouter) //en este caso no hay una ruta especificada, ya que la idea es que cuando el usuario ingrese ya se muestren los productos

// middleware
app.use(express.static(path.join(__dirname, "/public")))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// config de handlebars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, "/views"));



// routes principales
 
app.use("/api/products", prodRouter)
app.use("/api/carts", cartsRouter)


// socket configuracion
io.on("connection", async(socket)=>{
    console.log("cliente conectado");
    const products = await productsService.getProduct()

    socket.emit("products", products)

    // recibir el prod del socketClient
    socket.on("addProd", async(data)=>{
        await productsService.addProd(data)

       const products = await productsService.getProduct()
       
       io.emit("products", products)
    })
})






