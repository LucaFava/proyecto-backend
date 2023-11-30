import passport from "passport"
import localStrategy from "passport-local"
import { createHash, isValidPassword } from "../utils.js"
import { usersModel } from "../persistence/mongo/models/users.model.js"
import { config } from "./config.js"
import GithubStrategy from "passport-github2"

// passport se va a encargar de toda la lógica de autenticación, por lo que pronto tendremos que reemplazar el código de las rutas del archivo sessions.routes.js
export const initializatePassword = ()=>{
    // estrategia para registrar a los usuarios
    // este metodo lleva 2 parametros, el primero es el nombre de la estrategia para diferenciarla de las demás, el segundo, es el módulo con el que vamos a crear esa estrategia
                                        //localStrategy solo trabaja con 2 variables: useraname y password
    passport.use("signupLocalStrategy", new localStrategy(
        // esta funcion recibe 2 parámetros
        {
            // en el objeto vamos a definir 2 propiedades
            // esto lo que hace es pasarle el objeto "req" de la petición que viene con toda la info del form, y pasarselo al siguiente callback
            passReqToCallback: true,
            // como no tenemos el campo "username" que es con el que trabaja localStrategy, debemos hacer lo siguiente
            usernameField: "email" //le asignamos a "username" el valor del campo email
        },
        async(req, username, password, done)=>{
            const {first_name} = req.body;
            try {
                const user = await usersModel.findOne({email:username});
                if (user) {
                    // el usuario ya esta registrado
                    return done(null, false)
                }
                // el usuario no esta registrado
                const newUser = {
                    first_name,
                    email: username,
                    password: createHash(password)
                }
                console.log(newUser);
                const userCreated = await usersModel.create(newUser)
                return done(null, userCreated)
            } catch (error) {
               return done(error)
            }
        }
    ));
    
    // estrategia de registro con github
    passport.use("signupGithubStrategy", new GithubStrategy(
        {
            clientID: config.github.clientId,
            clientSecret: config.github.secretKey,
            callbackURL:`http://localhost:8080/api/sessions${config.github.callbackUrl}`
        },
        // profile son los datos del perfil de github del usuario
        async(accesToken, refreshToken, profile, done)=>{
            try {
                console.log("profile", profile);
            } catch (error) {
                return done(error)
            }
        }
    ))

    // estrategia para el login del usuario
    passport.use("loginLocalStrategy", new localStrategy(
        // esta funcion recibe 2 parámetros
        {
            // como no tenemos el campo "username" que es con el que trabaja localStrategy, debemos hacer lo siguiente
            usernameField: "email" //le asignamos a "username" el valor del campo email
        },
        async(username, password, done)=>{
            try {
                const user = await usersModel.findOne({email:username});
                if (!user) {
                    // el usuario no esta registrado
                    return done(null, false)
                }
                
                if (!isValidPassword(password, user)) {
                    return done(null, false)
                };

                // validamos que el usuario existe y la contraseña es correcta
                return done(null, user)
            } catch (error) {
               return done(error)
            }
        }
    ));
    



    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })

    passport.deserializeUser(async(id, done)=>{
        const user = await usersModel.findById(id)
        done(null,user)
    });
}
