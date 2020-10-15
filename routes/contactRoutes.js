const express = require('express');
const Joi = require('joi');
const { validate } = require('../helpers/validate');
const router = express.Router();
const {
  getAllContacts,
  addContact,
  getById,
  updateContact,
  removeContact,
  checkID,
  checkBody,
} = require('../controllers/contactController');

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

router.param('contactId', checkID);

router
  .route('/')
  .get(getAllContacts)
  .post(validate(userSchema), checkBody, addContact);

router
  .route('/:contactId')
  .get(getById)
  .patch(validate(changeUserSchema), updateContact)
  .delete(removeContact);

module.exports = router;
