import { type Request, type Response, Router } from "express"
import { orderRoutes } from "./order.routes.js";
import { cartRoutes } from "./cart.routes.js";

export const appRoutes = ():Router=>{

    
    const router = Router();

    router.get("/",async(req:Request,res:Response)=>{
        res.sendStatus(200)
    });

    router.use("/api/cart",cartRoutes());
    router.use("/api/order",orderRoutes());


    return router;

}