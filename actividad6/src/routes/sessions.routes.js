import { Router } from "express";
import { usersModel } from "../persistence/mongo/models/users.model.js";


const router = Router()



// ruta para el registro
router.post("/signup", async(req,res)=>{
    try {
        const signupForm = req.body;
        // para guardar los datos en al base de datos, para eso ahora tenemos que conectarnos a la base de datos y crear un esquema para los usuarios
        const result = await usersModel.create(signupForm);
        res.render("login", {message: "usuario registrado correctamente"})
    } catch (error) {
        // si hay un error volver a renderizar la sista 
        res.render("signUp", {error: error.message})
    }
})

// ruta para iniciar sesión
router.post("/login", async(req,res)=>{
    try {
        const loginForm = req.body;
        // validar si el usuario ya existe en la base de datos
        const user = await usersModel.findOne({email: loginForm.email})
        if (!user) {
            return res.render("login", {error: "no se pudo iniciar sesión, debes registrarte primero"});
        }
        // verificar la contraseña
        if (user.password !== loginForm.password) {
            return res.render("login", {error: "no se pudo iniciar sesión, credenciales invalidas"});
        }
        // usuario existe y contraseña valida, creamos la session del usuario
        req.session.email = user.email;
        res.redirect("/profile");
    } catch (error) {
        // si hay un error volver a renderizar la lista 
        res.render("login", {error: "no se pudo iniciar sesión"})
    }
})

export {router as sessionsRouter}