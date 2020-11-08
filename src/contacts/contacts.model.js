const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path')
const nanoid = require('nanoid')
const contactsPath = path.join(__dirname, '../../db/contacts.json')
async function listContacts() {
    const list = await fsp.readFile(contactsPath, "utf-8")
    return list
}
async function getContactById(contactId) {
    const contact = await fsp.readFile(contactsPath, "utf-8")
    const parseData = JSON.parse(contact)
    const foundContacts = parseData.filter(el => el.id === contactId)
    return foundContacts
}
async function removeContact(contactId) {
    const data = await fsp.readFile(contactsPath, "utf-8")
    const parseData = JSON.parse(data)
    const foundContacts = parseData.filter(el => el.id !== contactId)
    const strNewData = JSON.stringify(foundContacts)
    const newData = await fsp.writeFile(contactsPath, strNewData)
}
async function addContact({ name, email, phone }) {
    const id = nanoid.nanoid(3);
    const newContact = {
        id,
        name,
        email,
        phone,
    }
    await fsp.readFile(contactsPath, "utf-8", (err, data) => {
        let parseData = JSON.parse(data)
        parseData = [...parseData, newContact]
        const strNewData = JSON.stringify(parseData)
        fs.writeFile(contactsPath, strNewData, err => {
            if (err) {
                console.log(err);
            }
        })
    })
}
async function updateContact(contactId, data) {
    const contact = await fsp.readFile(contactsPath, "utf-8")
    const parseData = JSON.parse(contact)
    const index = parseData.findIndex(el => el.id === contactId);
    if (index === -1) {
        return false
    }
    else {
        parseData[index] = { ...parseData[index], ...data }
        const newData = await fsp.writeFile(contactsPath, JSON.stringify(parseData))
        return parseData[index]
    }
}

module.exports = {
    getContactById,
    removeContact, addContact, listContacts, updateContact
}