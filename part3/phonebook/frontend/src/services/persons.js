import axios from "axios";

const baseurl = "/api/persons/";

const getAll = () => axios.get(baseurl);

const create = (newPerson) => axios.post(baseurl, newPerson);

const remove = (id) => axios.delete(`${baseurl}${id}`);

const update = (id, newData) => axios.put(`${baseurl}${id}`, newData);

const modules = {
	getAll,
	create,
	remove,
	update,
};

export default modules;
