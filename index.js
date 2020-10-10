const express = require("express");
const Joi = require("joi");
const morgan = require("morgan");
const cors = require("cors");

const contacts = require("./db/contacts.json");

const server = express();
const port = 3000;

server.get("/api/contacts", listContacts, (req, res, next) => {
  res.status(200).send(contacts);
});

function listContacts(req, res, next) {
  const contactsScheme = Joi.object([]).required();

  const validationResult = contactsScheme.validate(req.query);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error);
  }

  next();
}

server.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }
  console.log(`server is listening on ${port}`);
});
