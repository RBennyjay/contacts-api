const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const contactsRoutes = require('./routes/contacts');

const app = express();
const PORT = process.env.PORT || 8080;

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app.use(cors());
app.use(express.json());

// Routes: Mount contactsRoutes at the root
app.use('/', contactsRoutes); 

// Root route
app.get('/', (req, res) => res.send('Contacts API Running'));

// Connect to DB and start server
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
