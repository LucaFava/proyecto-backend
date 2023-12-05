import { Router } from "express";
import passport from "passport"
import { config } from "../config/config.js"

const router = Router()



// ruta para el registro
router.post("/signup", passport.authenticate("signupLocalStrategy", {
    failureRedirect:"/api/sessions/fail-signup"
})) ,async(req,res)=>{
    res.render("login", {message: "usuario registrado correctamente"})
}

router.get("/fail-signup", (req,res)=>{
    res.render("signUp", {error: error.message})
})

// ruta de solicitud de registro con github
router.get("/signup-github", passport.authenticate("signupGithubStrategy"))
// ruta de callback de github
router.get(config.github.callbackUrl, passport.authenticate("signupGithubStrategy",{
    failureRedirect: "/api/sessions/fail-signup"
}), (req, res)=>{
   res.redirect("/profile")
})



// ruta para iniciar sesión
router.post("/login", passport.authenticate("loginLocalStrategy",{failureRedirect: "/api/sessions/fail-login"}) ,async(req,res)=>{

    res.redirect("/profile");
})
// si hay un error volver a renderizar la lista 
router.get("/fail-login",(req,res)=>{
    res.render("login", {error: "no se pudo iniciar sesión"})
})


// ruta para cerrar sesión 
router.get("/logout", async(req,res)=>{
    try {
        req.session.destroy(error => {
            if(error){
                return res.render("profile", {error:"no se pudo cerrar la sesión"});
            } else{
                res.redirect("/")
            }
           
        })
    } catch (error) {
        // si hay un error volver a renderizar la sista 
        res.render("signUp", {error: error.message})
    }
})

export {router as sessionsRouter}