const contacts = require('./contacts.js');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError.js');

exports.checkID = catchAsync(async (req, res, next, val) => {
  const contactsList = await contacts.listContacts();
  console.log(`Contact id is: ${val}`);
  const id = val;

  if (id > contactsList.length) {
    res.status(404).json({
      status: 'fail',
      message: 'ID Not found',
    });
    return;
  }
  next();
});

exports.getAllContacts = catchAsync(async (req, res, next) => {
  const contactsList = await contacts.listContacts();
  res.json({
    status: 'success',
    results: contacts.length,
    data: {
      contacts: contactsList,
    },
  });
});

exports.getById = catchAsync(async (req, res, next) => {
  const id = req.params.contactId * 1;
  const contact = await contacts.getById(id);

  if (!contact) {
    return next(new AppError(`No contact found with that ID`, 404));
  }

  res.json({
    status: 'success',
    data: {
      contact,
    },
  });
});

exports.addContact = catchAsync(async (req, res, next) => {
  const newContact = await contacts.addContact(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      contact: newContact,
    },
  });
});

exports.updateContact = catchAsync(async (req, res, next) => {
  const id = req.params.contactId * 1;
  const contact = await contacts.updateContact(id, req.body);

  if (!contact) {
    return next(new AppError(`No contact found with that ID`, 404));
  }

  res.json({
    status: 'success',
    data: {
      contact,
    },
  });
});

exports.removeContact = catchAsync(async (req, res, next) => {
  const id = req.params.contactId * 1;
  const contact = await contacts.getById(id);

  if (!contact) {
    return next(new AppError(`No contact found with that ID`, 404));
  }

  const removedContact = await contacts.removeContact(id);

  res.json({
    status: 'success',
    message: 'contact deleted',
    data: null,
  });
});
