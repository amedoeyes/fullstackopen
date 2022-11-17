import personService from "../services/persons";
import sendNotification from "../sendNotification";

const DeletePersonButton = ({
	persons,
	setPersons,
	setNotificationMessage,
	person,
}) => {
	const handleClick = (id, name) => {
		return () => {
			if (window.confirm(`Do you want to delete ${name}?`)) {
				personService
					.remove(id)
					.then(() => {
						setPersons(
							persons.filter((person) => person.id !== id)
						);
						sendNotification(
							setNotificationMessage,
							`${name} has been deleted from the phonebook`
						);
					})
					.catch((err) => {
						personService.getAll().then((res) => {
							setPersons(res.data);
						});
						sendNotification(
							setNotificationMessage,
							`${name} has already been deleted from the phonebook`
						);
					});
			}
		};
	};

	return (
		<button
			className="deletePersonButton hiddenPersonElement"
			onClick={handleClick(person.id, person.name)}
		>
			&times;
		</button>
	);
};

export default DeletePersonButton;
