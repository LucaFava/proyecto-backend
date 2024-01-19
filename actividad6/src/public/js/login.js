const loginForm = document.querySelector("#loginForm")
// mensaje de error de el login
const errorMsg = document.querySelector("#errorMsg")

 
// le agregamos el evento de submit al form
// la funcion va a ser asincrona ya que es una peticion al servidor
loginForm.addEventListener("submit",async(e)=>{
    e.preventDefault();

    const formValues = {
        email: e.target.email.value,
        password: e.target.password.value
    }

    const response = await fetch("/api/sessions/login", {
        headers: {
            // en este header le mandamos una instruccion para que mande y reciba info en formato json
            "Content-type":"application/json"
        },
        method: "POST",
        body:JSON.stringify(formValues)
    });
    // el fetch anterior me devuelve en formato http, si quiero recibir el objeto del form que seria en nombre y contraseña del usuario, debo recibirlo en formato json
    const result = await response.json();
    console.log(result);
    if(result.status === "success"){
        // para hacer un redirect simple se puede utilizar el siguiente metodo
        window.location.href="/profile";
    } else {
        errorMsg.innerHTML="no fue posible iniciar sesión";
    };
})