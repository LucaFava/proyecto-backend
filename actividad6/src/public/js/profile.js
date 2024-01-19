// le vamos a agregar un evento a la página completa
// en este caso vamos a detectar cuando la página se cargue por completo con el evento "DOMContentLoaded"
document.addEventListener("DOMContentLoaded", async()=>{
    const welcomeUser = document.querySelector("#welcomeUser")

    const response = await fetch("/api/sessions/profile", {
        headers: {
            "Content-type":"application/json"
        },
        method: "POST"
    });
    const result = await response.json();
    if (result.status === "success") {
        console.log("resultProfile", result.data);
        welcomeUser.innerHTML=`Bievenido ${result.data.name}`
    } else {
        window.location.href="/login"
    };
})