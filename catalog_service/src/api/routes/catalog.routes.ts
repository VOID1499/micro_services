import { Router , type Request , type Response } from "express";
import { CatalogService } from "../../services/catalog.service.js";
import { CatalogRepository } from "../../repository/catalog.repository.js";
import { RequestValidator } from "../../utils/requestValidator.js";
import { CreateProductRequest} from "../../dto/product.dto.js";

export const catalogService = new CatalogService(new CatalogRepository);

const routes = Router();

routes.post("/", async (req: Request, res: Response) => {
    
    try{
           const result = await RequestValidator(
            CreateProductRequest,
            req.body
        );

        console.log("VALIDATION RESULT:", result);

        if (result.errors) {
            return res.status(400).json({ errors: result.errors });
        }

        const data = await catalogService.createProduct(result.input);
        return res.status(201).json(data);
    }catch(error){

        return res.status(500).json({
            message:"error al crear producto"
        })

    }


     
});

export default routes;