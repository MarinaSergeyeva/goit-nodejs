const fs = require("fs");
const path = require("path");

const { promises: fsPromise } = fs;

const contactsPath = path.join(__dirname, "./db/contacts.json");
console.log("contactsPath", contactsPath);

// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const result = await fsPromise.readFile(
      contactsPath,
      "utf-8");
      return JSON.parse(result)
  } catch (err) {
    console.log('err.message', err.message);
    process.exit(1)
  }
}

async function getContactById(contactId) {
  try {
    const result = await listContacts();
    const userById = result.find((user) => user.id === contactId);
    return userById;
  } catch (err) {
    console.log('err.message', err.message);
    process.exit(1)
    }
  
}

async function removeContact(contactId) {
  try {
    const data = await listContacts();
    const userById = data.filter((user) => user.id !== contactId);
    await fsPromise.writeFile(contactsPath,JSON.stringify(userById))
    return listContacts();
  } catch (err) {
    console.log('err.message', err.message);
    process.exit(1)
  }

}

async function addContact(name, email, phone) {
  try {
    const data = await listContacts();
    const newUser = {
    id: data.length + 1,
    name,
    email,
    phone,
    };
    const newData = [...data, newUser];
    await fsPromise.writeFile(contactsPath, JSON.stringify(newData));
    return listContacts();
  } catch (err) {
    console.log('err.message', err.message);
    process.exit(1)
  }
  
}

module.exports = { listContacts, getContactById, removeContact, addContact };
