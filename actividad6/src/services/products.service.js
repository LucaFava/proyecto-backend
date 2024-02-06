import { productsDao } from "../persistence/index.js" 

export class ProductsService{
    static getProds = ()=>{
        return productsDao.getProduct()
    }

    static createProds = (prodInfo)=>{
        return productsDao.addProd(prodInfo)
    }

    static getProdId = (idProd)=>{
        return productsDao.getProductsById(idProd)
    }

    static updateProd = (id, newInfo)=>{
        return productsDao.updateProd(id,newInfo)
    }

    static deleteProd = (idProd)=>{
        productsDao.deleteProd(idProd)
    }

    static getProductPaginate = (query,options)=>{
        productsDao.getProductPaginate(query, options)
    }
}