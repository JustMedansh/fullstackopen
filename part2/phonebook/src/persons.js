import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getData = (request) => {
    return request.then(response => response.data)
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return getData(request)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return getData(request)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return getData(request)
}

export default {getAll, create, update}