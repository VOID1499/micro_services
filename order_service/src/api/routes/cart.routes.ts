import { Router ,type Request,type Response } from "express"
import * as service from "../../services/cart.service.js"

export const cartRoutes = ()=>{

    const router = Router();

    //crear carrito
    router.post("/",async(req:Request,res:Response)=>{
        return res.status(200).json({message:"cart create"})
    });

    //obtener carrito
    router.get("/:id",async(req:Request,res:Response)=>{
        return res.status(200).json({message:`carrito numero 1}`})
    });

    //actualizar carrito
    router.patch("/:id",async(req:Request,res:Response)=>{
        return res.status(200).json({message:"cart create"})
    });

    //eliminar carrito
    router.delete("/:id",async(req:Request,res:Response)=>{
        return res.status(200).json({message:"cart create"})
    });


    return router;

};
