// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'API for managing contacts',
    },
    servers: [
      {
        url: 'https://contacts-api-vy4b.onrender.com',
        description: 'Production server'
      },
      {
        url: 'http://localhost:8080',
        description: 'Local server'
      }
    ]
  },
  apis: ['./routes/*.js'], // Path to your route files with Swagger comments
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
