import type { CatalogRepositoryInterface } from "../interfaces/catalog.repository.interface.js";
import type { Product } from "../models/product.model.js";


export class MockCatalogRepository implements CatalogRepositoryInterface {
    
    create(data: Product): Promise<Product> {
        const mockProduct:Product = {
            id:123,
            ...data
        }

        return Promise.resolve(mockProduct);
    }
    update(data: Product): Promise<{}> {
        throw new Error("Method not implemented.");
    }
    delete(id: any): Promise<{}> {
        throw new Error("Method not implemented.");
    }
    find(): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
    findOne(data: any): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    
}