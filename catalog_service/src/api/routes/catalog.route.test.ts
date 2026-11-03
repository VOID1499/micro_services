import request from "supertest";
import express from "express";
import { faker } from "@faker-js/faker";
import catalogRoutes , { catalogService } from "./catalog.routes.js";
import { CatalogService } from "../../services/catalog.service.js";
import { productFactory } from "../../fatories/product.factory.js";

const app = express();

app.use(express.json());
app.use(catalogRoutes);


describe("catalog routes suite",()=>{


    let mockCatalogService:jest.Mocked<CatalogService>;

    beforeEach(()=>{

        mockCatalogService = {
            createProduct:jest.fn(),
            updateProduct:jest.fn(),
            deleteProduct:jest.fn(),
            getProducts:jest.fn(),
            getProduct:jest.fn()
        } as unknown as jest.Mocked<CatalogService>;

    });


    describe("POST /products",()=>{


        test("deberia crear un producto",async()=>{

            
            const requestBody = productFactory.build();
            
            jest.spyOn(catalogService,"createProduct")
            .mockResolvedValue(requestBody)

            const response = await request(app)
            .post("/")
            .send(requestBody)
            .set("Accepts","aplitacion/json")

            
            expect(response.status).toBe(201);
            expect(response.body).toEqual(requestBody)
        });


    });

});