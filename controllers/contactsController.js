const Contact = require('../models/contact');

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    console.log('Contacts from DB:', contacts); // Optional debug log
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Not Found' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
