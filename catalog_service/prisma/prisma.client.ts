import  { PrismaClient } from "./generated/client.js"
import { envs } from "../src/config/env.js";
import { PrismaPg } from "@prisma/adapter-pg";


const adapter = new PrismaPg({
  connectionString: envs.DATABASE_URL,
});

export const prisma = new PrismaClient({ adapter });