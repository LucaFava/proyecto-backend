export class SessionsControler{
    static redirectLogin = (req,res)=>{
        res.redirect("/login");
    };

    static failSignUp = (req,res)=>{
        res.render("signUp", {error:" error.message"})
    }

    static failGitHub = (req, res)=>{
        res.redirect("/profile", {message:"Login exitoso"})
    }
    
    static login = async(req,res)=>{
    console.log(req.user);
    // generamos el token del usuario
    const token = generateToken(req.user)
    // enviamos el token al cliente
    res.cookie("accessToken", token).json({status:"success", message:"login exitoso"})
    }

    static failLogin = (req,res) =>  {res.render("login", {error: "no se pudo iniciar sesión"})}

    static logout = async(req,res)=>{
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
    }

    static profile = (req,res)=>{
        console.log("req user-profile", req.user);
        res.json({status:"success", message:"peticion recibida", data:req.user})
    }

    static failProfile = (req,res)=>{
        res.json({status:"error", message:"token invalido"});
    }
}