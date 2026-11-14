// import "dotenv/config"; importacion mediante comando dev solo en desarrollo
import env from "env-var";


export const envs = {
    PORT: env.get("PORT").required().asPortNumber(),
    DATABASE_URL:env.get("DATABASE_URL").required().asString()
    
}