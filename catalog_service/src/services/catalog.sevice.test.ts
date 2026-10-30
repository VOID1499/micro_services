import { CatalogService } from "./catalog.service.js";
import type { CatalogRepositoryInterface } from "../interfaces/catalog.repository.interface.js";
import type { Product } from "../models/product.model.js";
import { faker } from "@faker-js/faker";
import { CatalogRepository } from "../repository/catalog.repository.js";

const mockProduct = (rest?:any)=>{
    return {
        name:faker.commerce.productName(),
        description:faker.commerce.productDescription(),
        stock:faker.number.int({min:0,max:100}),
        price:+faker.commerce.price(),
        ...rest
    }
}

describe("CatalogService", () => {
  let mockCatalogRepository: jest.Mocked<CatalogRepositoryInterface>;
  let catalogService: CatalogService;

  beforeEach(() => {
    mockCatalogRepository = {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
    } as unknown as jest.Mocked<CatalogRepositoryInterface>;

    catalogService = new CatalogService(mockCatalogRepository);
  });


  describe("casos de prueba para createProduct",()=>{

    test("debería crear un producto", async () => {
      const product: Product = mockProduct();

      mockCatalogRepository.create.mockResolvedValue({
        ...product,
        id: 123,
      });

      const result = await catalogService.createProduct(product);

      expect(result).toMatchObject({
        id:expect.any(Number),
        name:expect.any(String),
        description:expect.any(String),
        stock:expect.any(Number),
        price:expect.any(Number),
      });

      expect(mockCatalogRepository.create).toHaveBeenCalledWith(product);
    });

    //se retorna un objeto vacio desde el repositorio
    test("debería lanzar un error cuando el producto ya exista", async () => {
      const product: Product = mockProduct();

      mockCatalogRepository.create.mockResolvedValue({
        ...product,
        id: 123,
      });

      jest.spyOn(mockCatalogRepository,"create")
      .mockImplementationOnce(()=>Promise.resolve({} as Product))

      await expect(catalogService.createProduct(product)).rejects.toThrow("no se puede crear el producto");
    
    });

    //se lanza un error al intentar crear el producto desde el repositorio
    test("debería lanzar un error cuando el producto ya exista", async () => {
      const product: Product = mockProduct();

      mockCatalogRepository.create.mockResolvedValue({
        ...product,
        id: 123,
      });

      jest.spyOn(mockCatalogRepository,"create")
      .mockRejectedValue(new Error("error al crear producto"))

      await expect(catalogService.createProduct(product)).rejects.toThrow("error al crear producto");
    
    });
  });



  describe("casos de prueba para updatePorduct",()=>{


    test("debería actualizar un producto", async () => {
      const requestBody = mockProduct({
        id: faker.number.int({ min: 1, max: 1000 })
      });

      mockCatalogRepository.update.mockResolvedValue(requestBody);

      expect(mockCatalogRepository.update).toHaveBeenCalledWith(requestBody);
      await expect(catalogService.updateProduct(requestBody)).resolves.toMatchObject(requestBody);
    });
    
  });

  




});