import { usersModel } from "./models/users.model.js";

export class UsersManagerMongo {
    constructor(){
        this.model = usersModel
    };

    async createUser(userInfo){
        try {
            const result = await this.model.create(userInfo)
            return result;
        } catch (error) {
            console.log("createUser:", error.message);
            throw new Error ("No se pudo registrar el usuario")
        }
    };

    getUserById(idUser){
        try {
            const result = this.model.findById(idUser).lean();
            if (!result) {
                throw new Error ("No se pudo obtener al usuario")
            }
            return result;
        } catch (error) {
            console.log("getUserById:", error.message);
            throw new Error ("No se pudo obtener al usuario")
        }
    };


    getUserByEmail(emailUser){
        try {
            const result = this.model.findOne({email:emailUser}).lean();
            if (!result) {
                throw new Error ("No se pudo obtener al usuario")
            }
            return result;
        } catch (error) {
            console.log("getUserByEmail:", error.message);
            throw new Error ("No se pudo obtener al usuario")
        }
    };
}