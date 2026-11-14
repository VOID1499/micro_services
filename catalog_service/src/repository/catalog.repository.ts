import { PrismaClient } from "../../prisma/generated/client.js";
import { prisma } from "../../prisma/prisma.client.js";
import type { CatalogRepositoryInterface } from "../interfaces/catalog.repository.interface.js";
import { Product } from "../models/product.model.js";

export class CatalogRepository implements CatalogRepositoryInterface {

    private _prisma:PrismaClient;

    constructor(
    ){
        this._prisma = prisma;
    }
    
    async create(data: Product): Promise<Product> {
        const product = await this._prisma.product.create({
            data: {
                name: data.name,
                description: data.description,
                price: data.price,
                stock: data.stock,
            }
        });

        return new Product(
            product.name,
            product.description ?? "",
            product.price,
            product.stock,
            product.id
        );
    }

    async update(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }

    async delete(id: any): Promise<Product> {
        const product = await this._prisma.product.delete({
            where:{
                id
            }
        })

         return new Product(
            product.name,
            product.description ?? "",
            product.price,
            product.stock,
            product.id
        );
    }

    async find(limit:number,offSet:number): Promise<Product[]> {
        return this._prisma.product.findMany({
            take:limit,
            skip:offSet
        });
    }

    async findOne(id:number): Promise<Product> {
        const product = await this._prisma.product.findFirst({
            where:{
                id
            }
        });

        if(product){
            return Promise.resolve(product)
        }

        throw new Error("producto no encontrado");
    }

}