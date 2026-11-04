import { faker } from "@faker-js/faker";
import { Factory } from "rosie";
import type { Product } from "../models/product.model.js";

export const productFactory = new Factory<Product>()
  .sequence("id")
  .attr("name", () => faker.commerce.productName())
  .attr("description", () => faker.commerce.productDescription())
  .attr("price", () => +faker.commerce.price())
  .attr("stock", () => faker.number.int({ min: 1, max: 100 }));


  export const mockProduct = {
    name:faker.commerce.productName(),
    descrption:faker.commerce.productDescription(),
    price:faker.commerce.price(),
    stock:faker.number.int({min:1,max:100})
  }