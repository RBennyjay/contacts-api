const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables
const Contact = require('./models/contact'); // Import your Contact model

const contactsToSeed = [
  {
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice.smith@example.com',
    favoriteColor: 'purple',
    birthday: '1988-03-22T00:00:00.000Z'
  },
  {
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
    favoriteColor: 'orange',
    birthday: '1995-07-01T00:00:00.000Z'
  },
  {
    firstName: 'Charlie',
    lastName: 'Brown',
    email: 'charlie.brown@example.com',
    favoriteColor: 'brown',
    birthday: '1975-12-10T00:00:00.000Z'
  },
  {
    firstName: 'Diana',
    lastName: 'Prince',
    email: 'diana.p@example.com',
    favoriteColor: 'gold',
    birthday: '1980-06-05T00:00:00.000Z'
  },
  {
    firstName: 'Eve',
    lastName: 'Adams',
    email: 'eve.adams@example.com',
    favoriteColor: 'silver',
    birthday: '1999-01-01T00:00:00.000Z'
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding.');

    // Remove all existing contacts
    await Contact.deleteMany({});
    console.log('All old contacts removed.');

    // Insert new contacts
    await Contact.insertMany(contactsToSeed);
    console.log(`Successfully added ${contactsToSeed.length} new contacts.`);

  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

seedDatabase();
