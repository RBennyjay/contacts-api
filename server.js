const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

// const contactsRoutes = require('./routes/contacts');
// app.use('/contacts', contactsRoutes);

const contactRoutes = require('./routes/contacts');
app.use('/contacts', contactRoutes);


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection failed:', err));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
