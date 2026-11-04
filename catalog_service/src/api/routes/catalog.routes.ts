import { Router , type Request , type Response } from "express";
import { CatalogService } from "../../services/catalog.service.js";
import { CatalogRepository } from "../../repository/catalog.repository.js";
import { RequestValidator } from "../../utils/requestValidator.js";
import { ProductRequest } from "../../dto/product.dto.js";


export const catalogService = new CatalogService(new CatalogRepository);

const routes = Router();

routes.post("/",async (req:Request,res:Response)=>{


    const  {errors,input } = await RequestValidator(ProductRequest,req.body)
    if(errors) res.status(400).json(
        {errors}
    )
    const data = await catalogService.createProduct(req.body);
    res.status(201).json(data);
});

export default routes;