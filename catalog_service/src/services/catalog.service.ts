import type { CatalogRepositoryInterface } from "../interfaces/catalog.repository.interface.js";

export class CatalogService {


    constructor(
        private catalogRepository:CatalogRepositoryInterface
    ){}


    async createProduct(input:any){

        const data = await this.catalogRepository.create(input);
        if(!data.id){
            throw new Error("no se puede crear el producto")
        }
        return data;
    }

    async updateProduct(input:any){
        const data = await this.catalogRepository.update(input);    
        return data;
    }

    getProducts(limit:number,offset:number){}

    getProduct(id:number){}

    deleteProduct(id:number){}

}