import DeletePersonButton from "./DeletePersonButton";
import PersonContent from "./PersonContent";

const Person = ({ persons, setPersons, setNotificationMessage, person }) => {
	return (
		<div className="person" key={person.id}>
			<PersonContent person={person} />
			<DeletePersonButton
				persons={persons}
				setPersons={setPersons}
				setNotificationMessage={setNotificationMessage}
				person={person}
			/>
		</div>
	);
};

export default Person;
