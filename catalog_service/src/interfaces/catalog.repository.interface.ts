import type { Product } from "../models/product.model.js"


export interface CatalogRepositoryInterface {

    create(data:Product):Promise<Product>
    update(data:Product):Promise<Product>
    delete(id:any):Promise<Product>
    find(limit:number,offSet:number):Promise<Product[]>
    findOne(data:any):Promise<Product>

}