import express, { type Request, type Response, Router } from "express";
import { appRoutes } from "./routes/app.routes.js";

const app = express();

app.use(express.json());

app.get("/",(req:Request,res:Response)=>{
    res.sendStatus(201);
});

app.use(appRoutes())

export default app;

