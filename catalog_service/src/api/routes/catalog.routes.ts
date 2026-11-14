import { Router, type Request, type Response } from "express";
import type { CatalogService } from "../../services/catalog.service.js";

import { RequestValidator } from "../../utils/requestValidator.js";
import {
    CreateProductRequest,
    UpdateProductoRequest
} from "../../dto/product.dto.js";

export const createCatalogRoutes = (catalogService: CatalogService) => {

    const routes = Router();

    routes.post("/", async (req: Request, res: Response) => {
        try {
            const result = await RequestValidator(
                CreateProductRequest,
                req.body
            );

            if (result.errors) {
                return res.status(400).json({ errors: result.errors });
            }

            const data = await catalogService.createProduct(result.input);

            return res.status(201).json(data);

        } catch (error) {
            console.log(error);

            return res.status(500).json({
                message: "internal server error"
            });
        }
    });

    routes.put("/:id", async (req: Request, res: Response) => {
        try {
            const result = await RequestValidator(
                UpdateProductoRequest,
                req.body
            );

            if (result.errors) {
                return res.status(400).json({ errors: result.errors });
            }

            const id = Number(req.params.id);

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({
                    message: "Invalid product ID"
                });
            }

            const data = await catalogService.updateProduct(result.input);

            return res.status(200).json(data);

        } catch (error) {
            console.log(error);

            return res.status(500).json({
                message: "internal server error"
            });
        }
    });


    routes.get("/:id", async (req: Request, res: Response) => {
        try {
          

            const id = Number(req.params.id);

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({
                    message: "Invalid product ID"
                });
            }

            const data = await catalogService.getProduct(id);

            return res.status(200).json(data);

        } catch (error) {
            console.log(error);

            return res.status(500).json({
                message: "internal server error"
            });
        }
    });


    routes.get("/",async(req:Request,res:Response)=>{

        try {
            const limit =  Number(req.query["limit"]);
            const offset =  Number(req.query["offset"]);
            
            const data = await catalogService.getProducts(limit,offset);

            return res.status(200).json(data)

        } catch (error) {
            console.log(error);
        }

    });


    routes.delete("/:id",async(req:Request,res:Response)=>{

        const id = Number(req.params.id);
        const data = await catalogService.deleteProduct(id);

        return res.status(200).json(data)

    });



    return routes;
};