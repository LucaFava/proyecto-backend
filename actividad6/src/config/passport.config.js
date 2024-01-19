import passport from "passport"
import localStrategy from "passport-local"
import { PRIVATE_KEY, createHash, isValidPassword } from "../utils.js"
import { usersModel } from "../persistence/mongo/models/users.model.js"
import GithubStrategy from "passport-github2"
import { userService } from "../persistence/index.js"
import jwt from "passport-jwt"

const JWTStrategy = jwt.Strategy;
const extractJwt = jwt.ExtractJwt


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
            const {first_name, last_name,age} = req.body;
            try {
                const user = await userService.getUserByEmail(username)
                if (user) {
                    // el usuario ya esta registrado
                    return done(null, false)
                }
                // el usuario no esta registrado
                const newUser = {
                    first_name,
                    last_name,
                    age,
                    email: username,
                    password: createHash(password)
                }
                console.log(newUser);
                const userCreated = await userService.createUser(newUser)
                return done(null, userCreated)
            } catch (error) {
               return done(error)
            }
        }
    ));
    
    // estrategia de registro con github
    passport.use("signupGithubStrategy", new GithubStrategy(
        {
            clientID:"Iv1.0bb9551b6da5cf14",
            clientSecret: "4769d07c59d0db20ebc6b38b91df3ea1fe572acc",
            callbackURL:"http://localhost:8080/api/sessions/github-callback"
        },
        // profile son los datos del perfil de github del usuario
        async(accesToken, refreshToken, profile, done)=>{
            try {
                // console.log("profile", profile);
                const user = await usersModel.findOne({email:profile.username});
                if (user) {
                    // el usuario ya esta registrado
                    return done(null, user)
                }
                // el usuario no esta registrado
                const newUser = {
                    first_name: profile.username,
                    email: profile.username,
                    password: createHash(profile.id)
                }
                console.log(newUser);
                const userCreated = await usersModel.create(newUser)
                return done(null, userCreated)
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
                const user = await userService.getUserByEmail(username);
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
    
    // estrategia de jwt
    passport.use("jwtAuth", new JWTStrategy(
        {
            // extraer la info del token
            jwtFromRequest:extractJwt.fromExtractors([cookieExtractor]),
            secretOrKey:PRIVATE_KEY
        },
        async (jwtPayload, done)=>{
            try {
                return done(null, jwtPayload)
            } catch (error) {
                return done(error)
            }
        }
    ))
};
// funcion para extraer el token
const cookieExtractor = (req)=>{
    let token;
    if (req && req.cookies) {
        token = req.cookies["accessToken"]
    } else {
        token= null
    };
    return token
}
