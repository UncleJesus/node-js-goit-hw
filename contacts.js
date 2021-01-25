const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join("./db", "/contacts.json");

async function listContacts() {
  let listOfContacts;
  try {
    listOfContacts = await fs.readFile(contactsPath, "utf-8");
    console.log("HELLO");
  } catch (error) {
    console.log("error", error);
  }

  const arrayOfContacts = JSON.parse(listOfContacts.toString());
  console.table(arrayOfContacts);
  return arrayOfContacts;
}

async function getContactById(contactId) {
  const listOfContacts = await listContacts();
  const contact = listOfContacts.find((contact) => {
    contact.id === contactId;
  });
  console.table(contact);
}

async function removeContact(contactId) {
  const listOfContacts = await listContacts();
  const filteredContacts = listOfContacts.filter((contact) => {
    return contact.id !== contactId;
  });
  await writeToFile(filteredContacts);
  await listContacts();
}

async function addContact(name, email, phone) {
  const listOfContacts = await listContacts();
  const getContactsId = listOfContacts.map((contact) => contact.id);
  let id = 0;
  for (let element of getContactsId) {
    if (element > id) id = element;
  }
  id++;
  listOfContacts.push({ id, name, email, phone });
  await writeToFile(listOfContacts);
  await listContacts();
}

async function writeToFile(arr) {
  const arrayToString = JSON.stringify(arr);
  await fs.writeFile(contactsPath, arrayToString, (err) => {
    if (err) console.log("ERROR", err);
  });
}

module.exports = { listContacts, removeContact, addContact, getContactById };
