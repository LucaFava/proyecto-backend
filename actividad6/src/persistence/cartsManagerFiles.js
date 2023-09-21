import fs from "fs"

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
                const newCart = {
                    id:1,
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

    async addProdCart(cartId, prodId){
        
    }

}