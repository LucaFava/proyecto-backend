import fs from "fs"

 export class ProductManager{
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
                console.log("no se pudieron obtener los productos");
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    async addProd ({title, description, category, price, image, code, stock=30}){
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
                // const codeExist = prodJson.find((prod) => prod.code === code)
                if (prodJson.find((prod) => prod.code === code)) {
                    //console.error("el código ingresado ya existe");
                } else {
                    const newProd = {
                        id : id,
                        title,
                        description,
                        category,
                        price,
                        image,
                        code,
                        stock
                    }
                    
                    prodJson.push(newProd)
                }
               
                // transfromar a string otra vez para sobreescribir
                await fs.promises.writeFile(this.path, JSON.stringify(prodJson, null, "\t"))
                
                //console.log("producto agregado");
            } else {
                //throw new Error ("no es posible leer el archivo")
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
        const prodManager = new ProductManager("./files/productos.json")
        prodManager.addProd("campera Nike", "campera nike xxl","campera", 500, "sin imagen", "123")
        prodManager.addProd("air jordan retro 5", "zapatillas air jordan retro 5 negras","zapatilla", 1000, "sin imagen", "124")
        prodManager.addProd("remera adidas", "remera deportiva adidas blanca","remeras", 400, "sin imagen", "145")
        prodManager.addProd("jordan retro", "jordan retro rojas","zapatilla", 1200, "sin imagen", "146")
        prodManager.addProd("yeezy zebra", "yeezy adidas","zapatilla", 800, "sin imagen", "122")

        //const todos = await prodManager.getProduct()
        //console.log(todos);
        
        // prodManager.getProductsById(2)

        //prodManager.deleteProd(2)
        
        
        
    } catch (error) {
        console.log(error.message);
    }
}
operations()
