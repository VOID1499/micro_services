import { IsString } from "class-validator";

export class ProductRequest {

    @IsString()
    name:string;
    @IsString()
    description:string;
    
    price:number;
    stock:number;

}