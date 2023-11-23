import path from "path"
import { fileURLToPath } from "url"
import bcrypt from "bcrypt"


export const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log(__dirname);

export const createHash = (password) =>{
    // este método nos va a permitir generar el hash 
    // debemos pasarle el parámetro password que es la palabra que vamos a encriptar y además pasarle el algoritmo
    return bcrypt.hashSync(password, bcrypt.genSaltSync())
};


// aca se comparan las password, el método agarra la password nueva ingresada en el form, la hashea, y la compara con la que ya existia. Si coinciden devuelve true y si no, false
export const isValidPassword = (password, user)=>{
    return bcrypt.compareSync(password, user.password);
}