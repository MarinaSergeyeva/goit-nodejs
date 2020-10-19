const fs = require('fs');
const { promises: fsPromise } = fs;

const contactsPath = `${__dirname}/../db/contacts.json`;

async function listContacts() {
  const contacts = await fsPromise.readFile(contactsPath, 'utf-8');
  return JSON.parse(contacts);
}

async function getById(id) {
  const contacts = await listContacts();
  const contact = contacts.find(elem => elem.id === id);
  return contact;
}

async function addContact(contact) {
  const contacts = await listContacts();
  const newId = contacts[contacts.length - 1].id + 1;
  const newContact = Object.assign({ id: newId, ...contact });
  const newContactsList = [...contacts, newContact];

  await fsPromise.writeFile(contactsPath, JSON.stringify(newContactsList));
  return newContact;
}

async function updateContact(id, updatedContact) {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === id);

  if (index === -1) {
    return;
  } else
    contacts[index] = {
      ...contacts[index],
      ...updatedContact,
    };

  await fsPromise.writeFile(contactsPath, JSON.stringify([...contacts]));
  return contacts[index];
}

async function removeContact(id) {
  const contacts = await listContacts();
  const newContacts = contacts.filter(contact => contact.id !== id);

  await fsPromise.writeFile(contactsPath, JSON.stringify(newContacts));
  return id;
}

module.exports = {
  listContacts,
  getById,
  addContact,
  updateContact,
  removeContact,
};
