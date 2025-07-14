const Contact = require('../models/contact');

// GET all contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error fetching contacts.' });
  }
};

// GET contact by ID
const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }
    res.json(contact);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid Contact ID format.' });
    }
    console.error(err);
    res.status(500).json({ message: 'Server Error fetching contact by ID.' });
  }
};

// POST - Create new contact
const createContact = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const saved = await newContact.save();
    res.status(201).json({ id: saved._id });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.keys(err.errors).map(key => err.errors[key].message);
      return res.status(400).json({ message: 'Validation Error', errors });
    } else if (err.code === 11000) {
      return res.status(409).json({ message: 'Conflict: Email already exists.' });
    }
    console.error(err);
    res.status(500).json({ message: 'Server Error creating contact.' });
  }
};

// PUT - Update contact
const updateContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const updatedData = req.body;

    const result = await Contact.findByIdAndUpdate(contactId, updatedData, {
      new: true,
      runValidators: true,
      context: 'query'
    });

    if (!result) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    res.status(200).json(result);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid Contact ID format.' });
    } else if (err.name === 'ValidationError') {
      const errors = Object.keys(err.errors).map(key => err.errors[key].message);
      return res.status(400).json({ message: 'Validation Error', errors });
    } else if (err.code === 11000) {
      return res.status(409).json({ message: 'Conflict: Email already exists.' });
    }
    console.error(err);
    res.status(500).json({ message: 'Server Error updating contact.' });
  }
};

// DELETE - Remove contact
const deleteContact = async (req, res) => {
  try {
    const result = await Contact.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Contact not found.' });
    }
    res.status(200).json({ message: 'Contact deleted successfully.' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid Contact ID format.' });
    }
    console.error(err);
    res.status(500).json({ message: 'Server Error deleting contact.' });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};
