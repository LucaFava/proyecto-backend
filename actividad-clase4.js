const fs = require("fs")

class ProductManager{
    constructor(path){
        this.path = path
        this.products = []
    }
    fileExist(){
        return fs.existsSync(this.path)
    }



    async getProduct(){
        try {
            if (this.fileExist()) {
                const content = await fs.promises.readFile(this.path, "utf-8")
                // trasnformar a json
                const contentJson = JSON.parse(content)
                return contentJson
            } else {
                
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    async addProd (title, description, price, image, code, stock=30){
        try {
            if (this.fileExist()) {
                // leer el archivo
                const content = await fs.promises.readFile(this.path, "utf-8")

                // Validacion para completar los campos
                if (!title || !description || !price || !image || !code || !stock ) {
                    return console.log("Todos los campos son obligatorios");
                }
                // id autoincrementable
                let id;
                if (this.products.length == 0) {
                    id=1
                } else {
                    id = this.products[this.products.length - 1].id + 1
                }
                // Estructura del producto
                const product = {
                    id : id,
                    title,
                    description,
                    price,
                    image,
                    code,
                    stock
                }
                this.products.push(product)
                // trasnformar a json para poder pushear
                const JsonContent = JSON.parse(content)
                JsonContent.push(this.products)

                // volver a trasnformar a string para sobreescribir
                await fs.promises.writeFile(this.path, JSON.stringify(JsonContent, null, "\t"))
                console.log("producto agregado");
                


            } else {
                throw new Error ("no es posible leer el archivo")
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

}

// OPERACIONES
const operations = async() => {
    try {
        const prodManager = new ProductManager("./productos.json")
        prodManager.addProd("titulo", "descripcion", 210, "sin imagen", "123",)
        prodManager.addProd("titulo2", "descripcion de prueba", 300, "sin imagen", "1234")
        prodManager.addProd("titulo2", "descripcion de prueba", 300, "sin imagen", "1234")
        // const prods = await prodManager.getProduct()
        // console.log(prods);
    } catch (error) {
        console.log(error.message);
    }
}
operations()