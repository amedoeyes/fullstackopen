import { useState, useEffect } from "react";
import theme from "./theme";
import personService from "./services/persons";
import Header from "./components/Header";
import Notification from "./components/Notification";
import PersonsContainer from "./components/PersonsContainer";
import PhonebookForm from "./components/PhonebookForm";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [search, setSearch] = useState("");
	const [notificationMessage, setNotificationMessage] = useState("");

	useEffect(() => {
		theme.setTheme();

		personService.getAll().then((res) => {
			setPersons(res.data);
		});
	}, []);

	return (
		<>
			<Header search={search} setSearch={setSearch} />
			{notificationMessage && (
				<Notification
					notificationMessage={notificationMessage}
					setNotificationMessage={setNotificationMessage}
				/>
			)}
			<PersonsContainer
				persons={persons}
				setPersons={setPersons}
				search={search}
				setNotificationMessage={setNotificationMessage}
			/>
			<PhonebookForm
				persons={persons}
				setPersons={setPersons}
				setNotificationMessage={setNotificationMessage}
			/>
		</>
	);
};

export default App;
