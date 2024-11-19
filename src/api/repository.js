import { useAxios } from "../plugins/useAxios";

const axios = useAxios();

// handling all apis from a separate file to avoid confusion for any changes in the api
const repository = {
    getUsers : () => axios.get('/users'),
    addUser : (user) => axios.post('/users', user),
    updateUser : (id, user) => axios.put(`users/${id}`, user),
    deleteUser: (id) => axios.delete(`users/${id}`),
    getUser:(id) => axios.get(`users/${id}`)
};


export default repository