import { decode } from "jsonwebtoken";


export const isAuth = (req,res,next)=>{
    console.log("middleware");
    next();
};


export const checkRole = (role)=>{
    return (req,res,next)=>{
        let token = req.cookies.accessToken;

        // decodificar el token
        let decodeToken = decode(token)
        console.log(decodeToken);
        if (!role.includes(decodeToken.role)) {
            res.json({status:"error", message:"no tienes acceso"})
        } else {
            next()
        }
        
    }
};