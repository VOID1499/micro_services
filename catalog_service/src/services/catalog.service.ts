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

    async getProducts(limit:number,offset:number):Promise<any[]>{
        const data = await this.catalogRepository.find(limit,offset)
        return data
    }

    async getProduct(id:number){
        const data = await this.catalogRepository.findOne(id);
        return data;
    }

    async deleteProduct(id:number){
        const data = await this.catalogRepository.delete(id);
        return data;
    }

}