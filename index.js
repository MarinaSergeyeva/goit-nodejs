const contacts = require("./contacts.js");

// index.js
const argv = require("yargs").argv;

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.table(await contacts.listContacts());
      //   node index.js --action="list"
      break;

    case "get":
      console.table(await contacts.getContactById(id));
      //   node index.js --action="get" --id=5
      break;

    case "add":
      console.table(await contacts.addContact(name, email, phone));
      //   node index.js --action="add" --name="Mango" --email="mango@gmail.com" --phone="322-22-22"
      break;

    case "remove":
      console.table(await contacts.removeContact(id));
      //   node index.js --action="remove" --id=3
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
