const fs = require("fs/promises");
const path = require("path");

const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  const result = data.find((item) => item.id === contactId);
  return result || null;
}
async function addContact(name, email, phone) {
  const data = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newContact;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const removedContactIndex = data.findIndex((item) => item.id === contactId);
  if (removedContactIndex === -1) {
    return null;
  }
  const [removedContact] = data.splice(removedContactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return removedContact;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
