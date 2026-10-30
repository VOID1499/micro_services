import { Router } from "express";

//importar resto de rutas
import catalogRoutes from "./catalog.routes.js"

export class AppRoutes{
    constructor(){}

    static createAppRoutes():Router{
        const router = Router();
		
		//ruta de prueba
        router.get("/",(req,res)=>{
            res.send("Hola mundo!")
        });

        router.use("/api/products",catalogRoutes);

        return router;
    }
}