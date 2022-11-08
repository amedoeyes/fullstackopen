import { useState, useEffect } from "react";
import personService from "./services/persons";
import Header from "./Header";
import Notification from "./Notification";
import PhoneBookForm from "./PhoneBookForm";
import Persons from "./Persons";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [search, setSearch] = useState("");
	const [notification, setNotification] = useState(null);

	useEffect(() => {
		personService.getAll().then((res) => {
			setPersons(res.data);
		});
	}, []);

	return (
		<>
			<Header search={search} setSearch={setSearch} />
			{notification && (
				<Notification
					notification={notification}
					setNotification={setNotification}
				/>
			)}
			<div className="main">
				<PhoneBookForm
					persons={persons}
					setPersons={setPersons}
					setNotification={setNotification}
				/>
				<Persons
					persons={persons}
					setPersons={setPersons}
					search={search}
					setNotification={setNotification}
				/>
			</div>
		</>
	);
};

export default App;
