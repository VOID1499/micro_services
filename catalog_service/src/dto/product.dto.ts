import { IsOptional, IsString } from "class-validator";

export class CreateProductRequest {

    @IsString()
    name:string;
    @IsString()
    description:string;
    
    price:number;
    stock:number;

}


export class UpdateProductoRequest {

    @IsOptional()
    @IsString()
    name?:string;

    @IsOptional()
    @IsString()
    description?:string;
    
    @IsOptional()
    price?:number;

    @IsOptional()
    stock?:number;

} 