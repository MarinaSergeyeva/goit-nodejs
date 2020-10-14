const fs = require('fs');
const express = require("express");

const port = 3000;
const server = express();

server.use(express.json());

function listContacts() {
  const contacts = fs.readFileSync(`${__dirname}/db/contacts.json`,'utf-8');
  return JSON.parse(contacts)
}
const contacts = listContacts();

const getAllContacts = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    results: contacts.length,
    data: {
      contacts: contacts,
    },
  });
};

const getById = (req, res, next) => {
  console.log('req.params', req.params);
  const id = req.params.contactId * 1;
  const contact = contacts.find(elem => elem.id === id);

  if (!contact) {
    return res.status(404).json({
      status: 'fail',
      message: "Not found",
    })
  }
  res.status(200).json({
    status: 'success',
    data: {
      contact,
    },
  });
};

const addContact = (req, res) => {
  // console.log('req.body', req.body)
  const newId = contacts[contacts.length - 1].id + 1;
  const newContact = Object.assign({ id: newId }, req.body);

  contacts.push(newContact);
  fs.writeFile(`${__dirname}/db/contacts.json`, JSON.stringify(contacts), err => {
    res.status(201).json({
      status: 'success',
      data: {
        contact: newContact,
      }
    })
  })
};

const updateContact = (req, res) => {
  if (req.params.contactId * 1 > contacts.length) {
    return res.status(404).json({
      status: 'fail',
      message: "Not found",
    })
  }
  res.status(200).json({
    status: "success",
    data: {
      contact: '<Updated Contact here...>'
    }
  })
};

const removeContact  = (req, res) => {
  if (req.params.contactId * 1 > contacts.length) {
    return res.status(404).json({
      status: 'fail',
      message: "Not found",
    })
  }
  res.status(204).json({
    status: "success",
    message:"contact deleted",
    data: null,
  })
};

// server.get("/api/contacts", getAllContacts);
// server.post("/api/contacts", createContact);
// server.get("/api/contacts/:contactId",getContact);
// server.patch("/api/contacts/:contactId", updateContact);
// server.delete("/api/contacts/:contactId", deleteContact);

server
  .route('/api/contacts')
  .get(getAllContacts)
  .post(addContact);

server
  .route("/api/contacts/:contactId")
  .get(getById)
  .patch(updateContact)
  .delete(removeContact );

server.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }
  console.log(`server is listening on port ${port}...`);
});
