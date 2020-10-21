const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

class ContactModel {
  constructor() {
    this.db = mongoose.model('Contact', contactSchema);
  }

  async getContacts() {
    return await this.db.find();
  }

  async getContactById(id) {
    return await this.db.findById(id);
  }

  async addContact(contact) {
    return await this.db.create(contact);
  }

  async updateContact(id, contact) {
    return await this.db.findByIdAndUpdate(id, contact, {
      new: true,
    });
  }

  async deleteContact(id, contact) {
    return await this.db.findByIdAndRemove(id);
  }
}

module.exports = new ContactModel();
