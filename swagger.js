import swaggerAutogen from 'swagger-autogen';
import { DOMAIN, ENV } from './src/config/config.js';

const doc = {
  info: {
    title: 'Contacts and Animals API',
    description: 'Contacts API',
  },
  host: DOMAIN,
  schemes: ENV === 'development' ? ['http'] : ['https'],
  tags: [
    {
      name: 'Root',
      description: 'Root endpoint',
    },
    {
      name: 'Users',
      description: 'Endpoints for managing users',
    },
    {
      name: 'Transactions',
      description: 'Endpoints for managing transactions',
    },
    {
      name: 'Categories',
      description: 'Endpoints for managing categories',
    },
    {
      name: 'Reports',
      description: 'Endpoints for generating reports',
    },
  ],
};

const outputFile = './swagger.json';
const routes = ['./src/routes/index.js'];

swaggerAutogen()(outputFile, routes, doc);
