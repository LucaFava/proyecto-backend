import { productsModel } from "./models/product.model.js";


export class ProductsManagerMongo {
    constructor(){
        this.model = productsModel
    };



    async getProduct(){
        try {
            const result = await this.model.find()
            return result;
        } catch (error) {
            console.log("getProduct:", error.message);
            throw new Error ("No se pudo obtener el listado de productos")
        }
    };

    async addProd(prodInfo){
        try {
            const result = await this.model.create(prodInfo)
            return result;
        } catch (error) {
            console.log("addProduct:", error.message);
            throw new Error ("No se pudo crear el producto")
        }
    };

    getProductsById(idProd){
        try {
            const result = this.model.findById(idProd)
            return result;
        } catch (error) {
            console.log("getProductById:", error.message);
            throw new Error ("No se pudo obtener el productos")
        }
    };

    deleteProd(idProd){
        try {
            const result = this.model.findByIdAndDelete(idProd) //este metodo si no encuentra el id, devolverá un undefined
            // el tercer parametro es para que despues de actualizar el producto me devuelva el producto actualizado, por defecto el metodo devolverá el producto antes de ser actualizado
            if (!result) {
                throw new Error ("No se pudo encontrar el producto")
            } 
            return result;
        } catch (error) {
            console.log("deleteProd:", error.message);
            throw new Error ("No se pudo eliminar el productos")
        }
    };

    updateProd(id, newInfo){
        try {
            const result = this.model.findByIdAndUpdate(id, newInfo, {new:true}) //este metodo si no encuentra el id, devolverá un undefined
            // el tercer parametro es para que despues de actualizar el producto me devuelva el producto actualizado, por defecto el metodo devolverá el producto antes de ser actualizado
            if (!result) {
                throw new Error ("No se pudo encontrar el producto")
            } 
            return result;
        } catch (error) {
            console.log("updateProd:", error.message);
            throw new Error ("No se pudo actualizar el productos")
        }
    };

}