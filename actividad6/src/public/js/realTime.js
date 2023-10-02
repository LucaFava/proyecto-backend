const socketClient = io()
// elementos
const prods = document.querySelector(".listRealTime")
// formulario
const form = document.querySelector("#createProdForm")

// enviamos la info del form al socket del servidor
form.addEventListener("submit", (e)=>{
    e.preventDefault(); //en esta linea lo que hacemos es evitar ese recargo de página que tiene por defecto el formulario 
    const formInfo = new FormData(form) //captura todos los valores de los campos de texto del form
    
    const jsonInfo = {};
    //forOff lo que hace es que va iterando en cada elemento de un array para crear un objeto
    for(const [key, value] of formInfo.entries()) {
        jsonInfo[key] = value
    };
    jsonInfo.price = parseInt(jsonInfo.price)
    console.log(jsonInfo);

    socketClient.emit("addProd", jsonInfo);
    form.reset()
})


// recibimos los productos
socketClient.on("products", (data)=>{
    console.log(data);

    let prodsElm = ""

    data.forEach(element => {
        prodsElm +=
        `<li>
            <p> Nombre: ${element.title}</p>
            <p> Precio: ${element.price}</p>
        </li>`
        prods.innerHTML=prodsElm
    });
})