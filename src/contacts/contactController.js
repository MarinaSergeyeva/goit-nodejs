const ContactModel = require('./contactsModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../errors/appError.js');

const getContactsController = catchAsync(async (req, res) => {
  const contacts = await ContactModel.getContacts();
  res.status(200).json({
    status: 'success',
    data: {
      contacts,
    },
  });
});

const getContactByIdController = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await ContactModel.getContactById(contactId);

  if (!contact) {
    return next(new AppError(`No contact found with that ID`, 404));
  }

  res.status(200).json({
    status: 'success',
    contact,
  });
});

const addContactController = catchAsync(async (req, res, next) => {
  const { body } = req;
  const newContact = await ContactModel.addContact(body);
  res.status(201).json({
    status: 'success',
    contact: newContact,
  });
});

const updateContactController = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await ContactModel.getContactById(contactId);

  if (!contact) {
    return next(new AppError(`No contact found with that ID`, 404));
  }

  const updatedContact = await ContactModel.updateContact(contactId, req.body);
  res.json({
    status: 'success',
    contact: updatedContact,
  });
});

const deleteContactController = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await ContactModel.deleteContact(contactId);
  res.json({
    status: 'success',
    message: 'contact deleted',
    data: null,
  });
});

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  deleteContactController,
};
