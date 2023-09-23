import fs from "fs"
import { productsService } from "./index.js"
import { cartsService } from "./index.js"



export class CartManagerFiles{
    constructor(path){
        this.path = path
    }

    fileExist(){
        return fs.existsSync(this.path)
    }

    async getCart(){
        try {
            if (this.fileExist()) {
                const content = await fs.promises.readFile(this.path, "utf-8")
                // trasnformar a json
                const cartsJson = JSON.parse(content)
                return cartsJson
            } else {
                console.log("no se pudieron obtener los carritos    ");
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    };

    async createCart(){
        try {
            if (this.fileExist()) {
                const content = await fs.promises.readFile(this.path, "utf-8")
                // trasnformar a json
                const cartsJson = JSON.parse(content)
                // id autoincrementable
                let id;
                if (cartsJson == 0) {
                    id=1
                } else {
                    id = cartsJson[cartsJson.length - 1].id + 1
                }
                const newCart = {
                    id:id,
                    products:[]
                }
                cartsJson.push(newCart)

                await fs.promises.writeFile(this.path, JSON.stringify(cartsJson, null, '\t'))
                return newCart
            } else {
                console.log("no se pudieron obtener los carritos");
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    };

    async addProdCart(cartId, prodId, quantity){
        // leer el archivo y transformar a json, para luego poder pushear el el producto
        try {
            const content = await fs.promises.readFile(this.path, "utf-8")

            const cartsJson = JSON.parse(content)

            const findCart = cartsJson.find(p=>p.id === cartId)
            
            if (findCart) {
                // si el carrito existe, validar la existencia del producto
                const findProd = findCart.products.find(e=>e.id === prodId)

                if (findProd) {
                    findProd.quantity += quantity
                } else {
                    findCart.products.push({
                        id:prodId,
                        quantity:quantity
                    })
                }
                await fs.promises.writeFile(this.path, JSON.stringify(cartsJson, null, '\t'))
                return findCart
            } else {
                throw new Error("el carrito no existe")
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

}