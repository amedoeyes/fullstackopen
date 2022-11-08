import axios from "axios";

const url = "http://localhost:3001/persons/";

const getAll = () => axios.get(url);

const create = (newPerson) => axios.post(url, newPerson);

const remove = (id) => axios.delete(`${url}${id}`);

const update = (id, newData) => axios.put(`${url}${id}`, newData);

const modules = {
	getAll,
	create,
	remove,
	update,
};
export default modules;
