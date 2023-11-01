

const socketClient = io()
// elementos
const prods = document.querySelector(".listRealTime")
// formulario
const form = document.querySelector("#createProdForm")




// enviamos la info del form al socket del servidor
form.addEventListener("submit", (e)=>{
    e.preventDefault(); //en esta linea lo que hacemos es evitar ese recargo de página que tiene por defecto el formulario 
    const formInfo = new FormData(form) //captura todos los valores de los campos de texto del form
    
    const jsonInfo = {}
    //forOff lo que hace es que va iterando en cada elemento de un array para crear un objeto
    for(const [key, value] of formInfo.entries()) {
        jsonInfo[key] = value
    };
    jsonInfo.price = parseInt(jsonInfo.price)
    console.log(jsonInfo);

    socketClient.emit("addProd", jsonInfo);
    form.reset()
})



// funcion para eliminar el producto
const deleteCartProd = (id)=>{
    console.log("id del prod:",id);
}
// recibimos los productos
socketClient.on("products", (data)=>{
    console.log(data);

    data.forEach(element => {
        const article = document.createElement("article")
        article.classList.add(".prodRealTime")
        article.innerHTML = `
        <div class="name"><h4>${element.title}</h4></div>
        <div class="price"><p>${element.price}</p></div>
        
        <button onClick="deleteCartProd('${element._id}')">Eliminar</button>
        
        `
        prods.append(article)
    });
})













// prodsElm = ""

//     data.forEach(element => {
//         prodsElm +=
//         `<div><p> Nombre: ${element.title}</p>
//         <p> Precio: ${element.price}</p></div>
//         <button onClick="deleteProd(${element.id})">Eliminar</button>`
//         prods.innerHTML=prodsElm
//     });