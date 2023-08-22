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
        } else{
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
    // Funcion para determinar si existe o no un producto dentro del array
    getProductsById(idProd){
       if (this.products.find((prod) => prod.id === idProd)) {
        console.log(this.products.find((prod) => prod.id === idProd));
       } else {
        console.log("error");
       }
    }
    
}


const prodManager = new ProductManager()



prodManager.addProd("nombre de prueba", "descripcion de prueba", 200, "sin imagen", "123", 25)
prodManager.addProd("zapatilla", "zapatilla nike", 300, "sin imagen", "145", 30 )
prodManager.addProd("remeras", "remera nike", 400, "sin imagen","132", 35 )


prodManager.getProductsById()//ingresar id
