import { Router , type Request , type Response } from "express";
import { CatalogService } from "../../services/catalog.service.js";
import { CatalogRepository } from "../../repository/catalog.repository.js";


export const catalogService = new CatalogService(new CatalogRepository);

const routes = Router();

routes.post("/",async (req:Request,res:Response)=>{

    const data = await catalogService.createProduct(req.body);
    res.status(201).json(data);
});

export default routes;