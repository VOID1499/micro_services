import type { CatalogRepositoryInterface } from "../interfaces/catalog.repository.interface.js";
import type { Product } from "../models/product.model.js";


export class CatalogRepository implements CatalogRepositoryInterface {

    constructor(){}
    
    create(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    update(data: Product): Promise<{}> {
        throw new Error("Method not implemented.");
    }
    delete(id: any): Promise<{}> {
        throw new Error("Method not implemented.");
    }
    find(limit:number,offSet:number): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
    findOne(data: any): Promise<Product> {
        throw new Error("Method not implemented.");
    }

}