const contacts = require('./contacts.model')
exports.createContact = async (req, res, next) => {
    try {
        const newContact = await contacts.addContact(req.body)
        return res.status(201).send(newContact)
    } catch (error) {
        next(error)
    }
}
exports.getContactsList = async (req, res, next) => {
    try {
        let list = await contacts.listContacts()
        if (list.length < 3) {
            return res.status(400).send('You dont have any contacts')
        }
        return res.status(200).send(JSON.parse(list))
    } catch (error) {
        next(error)
    }
}
exports.getContactById = async (req, res, next) => {
    try {
        let contact = await contacts.getContactById(req.params.id)
        if (contact.length === 0) {
            return res.status(400).send('{ "message": "Not found" }')
        }
        return res.status(200).send(contact)
    } catch (error) {
        next(error)
    }
}
exports.deleteContactReq = async (req, res, next) => {
    try {
        let contact = await contacts.getContactById(req.params.id)
        if (contact.length === 0) {
            return res.status(400).send('{ "message": "Not found" }')
        }
        await contacts.removeContact(req.params.id)
        return res.status(200).send('{ "message": "contact deleted" }')
    } catch (error) {
        next(error)
    }
}
exports.patchContact = async (req, res, next) => {
    try {
        let contact = await contacts.getContactById(req.params.id)
        if (contact.length === 0) {
            return res.status(400).send('{ "message": "Not found" }')
        }
        const updateContact = await contacts.updateContact(req.params.id, req.body)
        return res.status(200).send(updateContact)
    } catch (error) {
        next(error)
    }
}