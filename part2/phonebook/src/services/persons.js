import axios from 'axios'
const baseUrl = "http://localhost:3005/persons"

const getContacts = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addContact = (newPersonObj) => {
    const request = axios.post(baseUrl, newPersonObj)
    return request.then(response => response.data)
}

const deleteContact = (personId) => {
    const request = axios.delete(baseUrl + "/" + personId)
    return request.then(response => response.data);
}

const updateContact = (personObj) => {
    const request = axios.put(baseUrl+"/"+personObj.id, personObj)
    return request.then(response => response.data )
}

export default { getContacts, addContact, deleteContact, updateContact }