import app from "./api/httpServer.js"
import { envs } from "./config/envs.js"


const startServer = async ()=>{
    app.listen(envs.PORT,()=>{
        `Server on port :${envs.PORT}`
    });
}


startServer().then(()=>{
    console.log("server on")
})