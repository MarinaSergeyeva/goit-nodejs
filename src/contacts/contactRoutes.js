const express = require('express');
const Joi = require('joi');
const { validate } = require('../helpers/validate');
const router = express.Router();
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  deleteContactController,
} = require('./contactController');
const { protect } = require('../auth/authController');

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const changeUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});

router
  .route('/')
  .get(protect, getContactsController)
  .post(validate(userSchema), addContactController);

router
  .route('/:contactId')
  .get(getContactByIdController)
  .patch(validate(changeUserSchema), updateContactController)
  .delete(deleteContactController);

module.exports = router;
