import { Router } from "express";

//importar resto de rutas
import { createCatalogRoutes } from "./catalog.routes.js"
import { CatalogService } from "../../services/catalog.service.js";
import { CatalogRepository } from "../../repository/catalog.repository.js";

export class AppRoutes{
    constructor(){}

    static createAppRoutes():Router{
        const router = Router();
		
		//ruta de prueba
        router.get("/",(req,res)=>{
            res.send("Hola mundo!")
        });

        router.use("/api/products",createCatalogRoutes(new CatalogService(new CatalogRepository)));

        return router;
    }
}