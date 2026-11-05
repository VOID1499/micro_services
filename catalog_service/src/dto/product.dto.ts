import { IsString } from "class-validator";

export class CreateProductRequest {

    @IsString()
    name:string;
    @IsString()
    description:string;
    
    price:number;
    stock:number;

}