import { Router } from "express";
import passport from "passport"
import { SessionsControler } from "../controllers/sessions.controller.js"; 

const router = Router()


// ruta para el registro
router.post("/signup", passport.authenticate("signupLocalStrategy",{
    session:false,
    failureRedirect:"/fail-signup"
}) , SessionsControler.redirectLogin);
// ruta de error del registro
router.get("/fail-signup", SessionsControler.failSignUp)

// ruta de solicitud de registro con github
router.get("/signup-github", passport.authenticate("signupGithubStrategy"))

// ruta de callback de github
router.get("/github-callback", passport.authenticate("signupGithubStrategy",{
    failureRedirect: "/api/sessions/fail-signup"
}), SessionsControler.failGitHub)



// ruta para iniciar sesión
router.post("/login", passport.authenticate("loginLocalStrategy",{failureRedirect: "/api/sessions/fail-login",session:false}),SessionsControler.login)
// si hay un error volver a renderizar la lista 
router.get("/fail-login", SessionsControler.failLogin)


// ruta para cerrar sesión 
router.get("/logout", SessionsControler.logout)

// ruta de profile
router.post("/profile", passport.authenticate("jwtAuth",{
    session:false,
    failureRedirect:"/api/sessions/fail-profile"
}), SessionsControler.profile)

router.get("/fail-profile", SessionsControler.failProfile)


export {router as sessionsRouter}