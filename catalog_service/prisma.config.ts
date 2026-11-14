import { defineConfig, env } from 'prisma/config';
import { envs } from './src/config/env.js';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations:{
    path:"prisma/migrations"
  },
  datasource: {
    url: envs.DATABASE_URL,
  },
});

