const fs = require("fs");
const path = require("path");

const { promises: fsPromise } = fs;

const contactsPath = path.join(__dirname, "./db/contacts.json");
console.log("contactsPath", contactsPath);

// TODO: задокументировать каждую функцию
async function listContacts() {
  const result = await fsPromise.readFile(
    contactsPath,
    "utf-8",
    (err, data) => {
      if (err) throw err;

      return data;
    }
  );
  return JSON.parse(result);
}

// async function listContacts() {
//   return JSON.parse(await fsPromise.readFile(contactsPath, "utf-8"));
// }

async function getContactById(contactId) {
  const result = await listContacts();
  const userById = result.find((user) => user.id === contactId);

  return userById;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const userById = data.filter((user) => user.id !== contactId);

  return userById;
}

async function addContact(name, email, phone) {
  const data = await listContacts();
  const newUser = {
    id: data.length + 1,
    name,
    email,
    phone,
  };

  const newData = [...data, newUser];

  await fsPromise.writeFile(contactsPath, JSON.stringify(newData), (err) => {
    if (err) throw err;
  });
  return newData;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
