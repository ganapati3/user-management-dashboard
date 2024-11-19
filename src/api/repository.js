import { useAxios } from "../plugins/useAxios";

const axios = useAxios();


const repository = {
    getUsers : () => axios.get('/users'),
    addUser : (user) => axios.post('/users', user),
    updateUser : (id, user) => axios.put(`users/${id}`, user),
    deleteUser: (id) => axios.delete(`users/${id}`),
    getUser:(id) => axios.get(`users/${id}`)
};


export default repository