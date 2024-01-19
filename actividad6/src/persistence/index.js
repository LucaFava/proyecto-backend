import { ProductManager } from "./productManager.js";
import { CartManagerFiles } from "./cartsManagerFiles.js";
// dirname es un punto de referencia, en este caso es la carpeta src
import { __dirname } from "../utils.js";
// path es una variable que no ayuda a unir rutas
import path from "path"
import { ProductsManagerMongo } from "./mongo/productsManagerMongo.js";
import { CartsManagerMongo } from "./mongo/cartsManagerMongo.js"
import { ChatManagerMongo } from "./mongo/chatManagerMongo.js";
import { UsersManagerMongo } from "./mongo/usersManagerMongo.js";


console.log("dirname: ", path.join(__dirname, "/files"));//unir rutas con path



export const productsService = new ProductsManagerMongo()
export const cartsService = new CartsManagerMongo()
export const chatsService = new ChatManagerMongo()
export const userService = new UsersManagerMongo()
// new CartManagerFiles(path.join(__dirname, "/files/cart.json"))