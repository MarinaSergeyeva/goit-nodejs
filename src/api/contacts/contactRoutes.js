const express = require('express');
const Joi = require('joi');
const { validate } = require('../../helpers/validate');
const router = express.Router();
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  deleteContactController,
  getContactsWithPagination,
} = require('./contactController');
const { protect, restrictTo } = require('../auth/authController');

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
  .get(protect, getContactsWithPagination)
  .post(protect, validate(userSchema), addContactController);

router
  .route('/:contactId')
  .get(protect, getContactByIdController)
  .patch(protect, validate(changeUserSchema), updateContactController)
  .delete(protect, restrictTo('admin', 'moderator'), deleteContactController);

module.exports = router;
