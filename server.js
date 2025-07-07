const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

// 🔽 Add root route 
app.get('/', (req, res) => {
  res.send('Contacts API is running 🚀');
});

// Contact routes
const contactRoutes = require('./routes/contacts');
app.use('/contacts', contactRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected');
  console.log(`📦 DB URI: ${process.env.MONGODB_URI}`);
})
.catch(err => console.error('❌ MongoDB connection failed:', err));

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
