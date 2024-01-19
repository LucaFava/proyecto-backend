import { Router } from "express";
import passport from "passport"
import { generateToken } from "../utils.js";


const router = Router()


// ruta para el registro
router.post("/signup", passport.authenticate("signupLocalStrategy",{
    session:false,
    failureRedirect:"/fail-signup"
}) , (req,res)=>{
    res.redirect("/login");
});
// ruta de error del registro
router.get("/fail-signup", (req,res)=>{
    res.render("signUp", {error:" error.message"})
})

// ruta de solicitud de registro con github
router.get("/signup-github", passport.authenticate("signupGithubStrategy"))

// ruta de callback de github
router.get("/github-callback", passport.authenticate("signupGithubStrategy",{
    failureRedirect: "/api/sessions/fail-signup"
}), (req, res)=>{
   res.redirect("/profile", {message:"Login exitoso"})
})



// ruta para iniciar sesión
router.post("/login", passport.authenticate("loginLocalStrategy",{failureRedirect: "/api/sessions/fail-login", session:false}) ,async(req,res)=>{
    console.log(req.user);
    // generamos el token del usuario
    const token = generateToken(req.user)
    // enviamos el token al cliente
    res.cookie("accessToken", token).json({status:"success", message:"login exitoso"})
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

// ruta de profile
router.post("/profile", passport.authenticate("jwtAuth",{
    session:false,
    failureRedirect:"/api/sessions/fail-profile"
}) ,(req,res)=>{
    console.log("req user-profile", req.user);
    res.json({status:"success", message:"peticion recibida", data:req.user})
})

router.get("/fail-profile", (req,res)=>{
    res.json({status:"error", message:"token invalido"});
})


export {router as sessionsRouter}