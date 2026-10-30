import { AppRoutes } from "./api/routes/app.routes.js";
import  { Server } from "./api/httpServer.js";
import { envs } from "./config/env.js";

(()=>{
    main()
})()

async function main(){
    new Server({port:envs.PORT, routes:AppRoutes.createAppRoutes()}).start();
}