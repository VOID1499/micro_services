import type { Product } from "../models/product.model.js"


export interface CatalogRepositoryInterface {

    create(data:Product):Promise<Product>
    update(data:Product):Promise<{}>
    delete(id:any):Promise<{}>
    find(limit:number,offSet:number):Promise<Product[]>
    findOne(data:any):Promise<Product>

}