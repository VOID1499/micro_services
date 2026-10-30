import  express, { Router } from "express";
//import { errorHandlerMiddleware } from "./middlewares/errorHandler.js";

import { AppRoutes } from "./routes/app.routes.js";
  

interface Options {
    port:number;
    routes:Router;
}

export class Server {

    public readonly app = express();
    private readonly port:number;
    private readonly routes:Router;

    constructor(options:Options){
        const { port , routes } = options;
        this.port = port;
        this.routes = routes;
    }
    

    async start(){

        //middlewares

        this.app.use(express.json());//formato json

        this.app.use(express.urlencoded({extended:true}));//formato x-www-form-urlencoded


        //rutas
        this.app.use(this.routes);

        //manejador central de errores
        //this.app.use(errorHandlerMiddleware);

        const server = this.app.listen(this.port,()=>{
            console.log(`Server on port: ${this.port}`)
        })
    }

}