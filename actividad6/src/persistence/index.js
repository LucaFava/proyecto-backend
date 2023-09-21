import { ProductManager } from "./productManager.js";
import { CartManagerFiles } from "./cartsManagerFiles.js";
// dirname es un punto de referencia, en este caso es la carpeta src
import { __dirname } from "../utils.js";
// path es una variable que no ayuda a unir rutas
import path from "path"
console.log("dirname: ", path.join(__dirname, "/files"));//unir rutas con path



export const productsService = new ProductManager(path.join(__dirname, "/files/productos.json"))
export const cartsService = new CartManagerFiles(path.join(__dirname, "/files/cart.json"))