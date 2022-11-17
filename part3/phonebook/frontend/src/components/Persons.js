import Person from "./Person";

const Persons = ({ persons, setPersons, search, setNotificationMessage }) => {
	const filteredPersons = search
		? persons.filter(
				(person) =>
					person.name.toLowerCase().includes(search.toLowerCase()) ||
					person.number.includes(search)
		  )
		: persons;

	return filteredPersons.map((person) => (
		<Person
			key={person.id}
			persons={persons}
			setPersons={setPersons}
			setNotificationMessage={setNotificationMessage}
			person={person}
		/>
	));
};

export default Persons;
