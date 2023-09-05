class ProductManager {
    constructor (){
        this.products = []
    }

    getProducts(){
        console.log(this.products);
    }
    
    

    addProd (title, description, price, thumbnail, code, stock) {
       
        // id autoincrementable
        let id;

        if (this.products.length == 0) {
            id=1
        } else {
            id = this.products[this.products.length - 1].id + 1
        }

        // Validacion para completar todos los campos 

        if (!title || !description || !price || !thumbnail || !code || !stock ) {
            console.log("Todos los campos son obligatorios");
        } 
        // validación de "code"

        const codeExist = this.products.find((prod) => prod.code === code)
        if (codeExist) {
           return console.error("el código ingresado ya existe");
        }else{
            const prod = {
                id : id,
                title,
                description, 
                price,
                thumbnail,
                code,
                stock
            }
            this.products.push(prod)
        }
       

    }
    // Función para determinar si existe o no un producto dentro del array
    getProductsById(idProd){
       if (this.products.find((prod) => prod.id === idProd)) {
        console.log(this.products.find((prod) => prod.id === idProd));
       } else {
         return console.log("no se encontró el producto");
       }
    }
    
}


const prodManager = new ProductManager()



prodManager.addProd("nombre de prueba", "descripcion de prueba", 200, "sin imagen", "145", 25)
prodManager.getProducts()
prodManager.addProd("air force","zapatilla nike", 300,"sin imagen", "145", 24)
prodManager.getProducts()



//prodManager.getProductsById()//ingresar id


