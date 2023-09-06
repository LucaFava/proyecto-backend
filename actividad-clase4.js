const fs = require("fs")

class ProductManager{
    constructor(path){
        this.path = path
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

                // transformar a json para poder pushear
                const prodJson = JSON.parse(content)

                // id autincrementable
                let id;
                if (prodJson == 0) {
                    id=1
                } else {
                    id = prodJson[prodJson.length - 1].id + 1
                }
                // validacion del code
                const codeExist = prodJson.find((prod) => prod.code === code)
                if (codeExist) {
                    return console.error("el código ingresado ya existe");
                } else {
                    const newProd = {
                        id : id,
                        title,
                        description,
                        price,
                        image,
                        code,
                        stock
                    }
                    
                    prodJson.push(newProd)
                }
               
                // transfromar a string otra vez para sobreescribir
                await fs.promises.writeFile(this.path, JSON.stringify(prodJson, null, "\t"))
                
                console.log("producto agregado");
            } else {
                throw new Error ("no es posible leer el archivo")
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
    
    getProductsById(idProd){
        const content = fs.readFileSync(this.path, "utf-8")
        const prodJson = JSON.parse(content)
        const searchId = prodJson.find((prod) => prod.id === idProd)
        if (searchId) {
            console.log(searchId);
        } else {
            console.log("no se ha encontrado el producto");
        }
    }

    deleteProd(idProd){
        const content = fs.readFileSync(this.path, "utf-8")
        const prodJson = JSON.parse(content) 
        const filter = prodJson.filter((prod) => prod.id != idProd)
        fs.writeFileSync(this.path, JSON.stringify(filter, null, "\t"))
        console.log("producto eliminado");
    }
}

// OPERACIONES

const operations = async() => {
    try {
        const prodManager = new ProductManager("./productos.json")
        // prodManager.addProd("nombre", "descripcion", 200, "sin imagen", "code")
        // prodManager.addProd("nombre", "descripcion", 200, "sin imagen", "code")
        // prodManager.addProd("nombre", "descripcion", 400, "sin imagen", "code")

        // prodManager.getProductsById(2)

        prodManager.deleteProd(2)
        
        
        
    } catch (error) {
        console.log(error.message);
    }
}
operations()
