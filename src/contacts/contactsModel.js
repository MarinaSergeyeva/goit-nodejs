const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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

contactSchema.plugin(mongoosePaginate);

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

  async contactsPagination() {
    const options = {
      page: 1,
      limit: 10,
      collation: {
        locale: 'en',
      },
    };

    return await this.db
      .paginate({}, options, function (err, result) {
        result.docs;
      })
      .then({});
  }
}

module.exports = new ContactModel();
