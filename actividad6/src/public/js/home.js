const socketClientHome = io()



const addToCart = async(prodId)=>{
    console.log("producto agregado", prodId);
    
    socketClientHome.emit("addProdCart", prodId)
}