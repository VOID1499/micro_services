import request from "supertest";
import express, { type Express } from "express";

import { createCatalogRoutes } from "./catalog.routes.js";
import { CatalogService } from "../../services/catalog.service.js";
import { productFactory, mockProduct } from "../../fatories/product.factory.js";
import { faker } from "@faker-js/faker";

describe("catalog routes suite", () => {

    let app: Express;
    let mockCatalogService: jest.Mocked<CatalogService>;

    beforeEach(() => {

        mockCatalogService = {
            createProduct: jest.fn(),
            updateProduct: jest.fn(),
            deleteProduct: jest.fn(),
            getProducts: jest.fn(),
            getProduct: jest.fn()
        } as unknown as jest.Mocked<CatalogService>;

        app = express(); 

        app.use(express.json());

        app.use(createCatalogRoutes(mockCatalogService));

    });

    describe("POST /products", () => {

        test("deberia crear un producto", async () => {

            const requestBody = productFactory.build();

            mockCatalogService.createProduct
                .mockResolvedValue(requestBody);

            const response = await request(app)
                .post("/")
                .send(requestBody);

            expect(response.status).toBe(201);
            expect(response.body).toEqual(requestBody);

            expect(mockCatalogService.createProduct)
                .toHaveBeenCalledTimes(1);

        });

        test("deberia retornar 400 cuando falten parametros", async () => {

            const requestBody = mockProduct;

            const response = await request(app)
                .post("/")
                .send({ ...requestBody, name: "" });

            expect(response.status).toBe(400);

            expect(mockCatalogService.createProduct)
                .not.toHaveBeenCalled();

        });

        test("deberia retornar 500 cuando el servicio falle", async () => {

            const requestBody = productFactory.build();

            mockCatalogService.createProduct
                .mockRejectedValue(new Error("Error al crear producto"));

            const response = await request(app)
                .post("/")
                .send(requestBody);

            expect(response.status).toBe(500);

            expect(response.body).toMatchObject({
                message: "internal server error"
            });

        });

    });

    describe("PUT /products/:id", () => {

        test("deberia actualizar el producto exitosamente", async () => {

            const mockProductoFactory = productFactory.build();

            mockCatalogService.updateProduct.mockResolvedValue(mockProductoFactory);

            const response = await request(app)
                .put(`/${mockProductoFactory.id}`)
                .send(mockProductoFactory);

            expect(response.status).toBe(200);

            expect(response.body).toMatchObject(mockProductoFactory);

            expect(mockCatalogService.updateProduct)
                .toHaveBeenCalledTimes(1);

        });

    });

    describe("GET /products/:id",()=>{

        test("deberia traer un producto por id de forma exitosa",async ()=>{

            const mockProductoFactory = productFactory.build();
            const id = mockProductoFactory.id;

            mockCatalogService.getProduct.mockResolvedValue(mockProductoFactory);

            const response = await request(app)
            .get(`/${id}`)
            .set("Accepts","application/json")

            expect(response.body).toMatchObject(mockProductoFactory)

        });

    });


    describe("GET /products?limit=0&offset=0",()=>{

        test("deberia traer un listado de productos delimitado por un limit y offset",async ()=>{

            const randomLimit = faker.number.int({min:1,max:20});
            const offset = 0;

            const mockProductsFactory = productFactory.buildList(randomLimit);

            mockCatalogService.getProducts.mockResolvedValue(mockProductsFactory);

            const response = await request(app)
            .get(`/?limit=${randomLimit}&offset${offset}`)
            
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockProductsFactory);

        });

    });

    describe.only("DELETE /products/:id",()=>{

        test("deberia eleminar un producto por id",async ()=>{

            const mockProductFactory = productFactory.build();

            mockCatalogService.deleteProduct.mockResolvedValue(mockProductFactory.id!);

            const response = await request(app)
            .delete(`/${mockProductFactory.id}`)


            expect(response.body).toEqual(mockProductFactory.id);
            expect(response.status).toBe(200);
            expect(mockCatalogService.deleteProduct).toHaveBeenCalledWith(Number(mockProductFactory.id));            


        });

    });

});