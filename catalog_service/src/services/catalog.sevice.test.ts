import { CatalogService } from "./catalog.service.js";
import type { CatalogRepositoryInterface } from "../interfaces/catalog.repository.interface.js";
import type { Product } from "../models/product.model.js";
import { faker } from "@faker-js/faker";
import { productFactory } from "../fatories/product.factory.js";



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

      await expect(catalogService.updateProduct(requestBody)).resolves.toMatchObject(requestBody);
      expect(mockCatalogRepository.update).toHaveBeenCalledWith(requestBody);
    });


    test("deberia lanzar un error", async ()=>{

       const requestBody = mockProduct({
        id: faker.number.int({ min: 1, max: 1000 })
      });

      jest.spyOn(mockCatalogRepository,"update").mockRejectedValue(new Error("el producto no existe"));

      await expect(catalogService.updateProduct(requestBody)).rejects.toThrow("el producto no existe");

    })

  });


  describe("casos de prueba para getProductos",()=>{


    test("deberia devolver un arreglo con productos",async ()=>{


      const randomLimit = faker.number.int({min:10,max:50});
      const offSet = 0;

      const mockProducts = productFactory.buildList(randomLimit)
      jest.spyOn(mockCatalogRepository,"find").mockResolvedValue(mockProducts)

      const data = await catalogService.getProducts(randomLimit,offSet);
      expect(data.length).toEqual(randomLimit);
      expect(data).toMatchObject(mockProducts)

    });


    test("deberia lanzarse un error al tratar de devolver los productos",async()=>{

      jest.spyOn(mockCatalogRepository,"find")
      .mockRejectedValue(new Error("error al buscar productos"))

      await expect(catalogService.getProducts(0,0)).rejects.toThrow("error al buscar productos")

    });

  });
  


  describe("casos de prueba para getProduct",()=>{

    test("deberia obtener un producto por id",async ()=>{
      const mockProductFactory = productFactory.build();
      jest.spyOn(mockCatalogRepository,"findOne")
      .mockResolvedValue(mockProductFactory)
      const result = await catalogService.getProduct(mockProductFactory.id!);

      expect(result).toMatchObject(mockProductFactory);
    })

    


  });


  describe("casos de de prueba para deletProduct",()=>{

    test("deberia eliminar un producto y retornarlo", async()=>{

      const mockProductFactory = productFactory.build();

      jest.spyOn(mockCatalogRepository,"delete")
      .mockResolvedValue(mockProductFactory)

      const data = await catalogService.deleteProduct(mockProductFactory.id!);

      expect(data).toMatchObject(mockProductFactory);



    });

  })




});