import dotenv from "dotenv"
dotenv.config()

export const config = {
    server:{
        secretSession: process.env.SECRETSESSION
    },
    mongo:{
        url: process.env.MONGO_URL
    },
    github:{
        callbackUrl:process.env.GITHUB_CALLBACK_URL,
        clientId:process.env.GITHUB_CLIENT_ID,
        secretKey:process.env.GITHUB_SECRET_KEY
    }
}