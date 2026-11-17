import { type Request, type Response, Router } from "express";


export const orderRoutes = ():Router=>{

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

}