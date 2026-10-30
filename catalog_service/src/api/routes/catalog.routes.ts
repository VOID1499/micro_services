import { Router , type Request , type Response } from "express";



const routes = Router();

routes.post("/",(req:Request,res:Response)=>{
    res.sendStatus(201);
});

export default routes;