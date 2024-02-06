import { ProductsService } from "../services/products.service.js"; 

export class ProductController{
    static getProducts = async(req, res) => {
        try {
            const result = await ProductsService.getProds()
            res.json({status: "success", data: result})
        } catch (error) {
            res.json({status: "error", message: error.message})
        }
    };

    static getProductId = async(req,res)=>{
        try {
            const id = parseInt(req.params.pid)
            // const product = await productsService.getProductsById(id)
            //  res.json(product)
             const products = await ProductsService.getProdId(prodId)
             const prodId = products.find((p)=> p.id === id)
             if (prodId) {
                 res.json(prodId)
             } else {
                 res.json({status:"error", message:error.message})
             }
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    }

    static createProducts = async(req,res)=> {
        try {
            const prodInfo = req.body
            const result = await ProductsService.createProds(prodInfo)
            res.json({status: "success", result})
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    }

    static updateProducts = async(req,res)=>{
        try {
            const id = req.params.pid;
            const newInfo = req.body;
    
            const result = await ProductsService.updateProd(id, newInfo)
            res.json({status: "success", data: result})
        } catch (error) {
            res.json({message:error.message})
        }
    }

    static deleteProduct = async(req,res)=>{
        try {
            const id = req.params.pid;
    
            const result = await ProductsService.deleteProd(idProd)
            res.json({status: "success", data: result})
        } catch (error) {
            res.json({message:error.message})
        }
     }



}