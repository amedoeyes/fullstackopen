import { useRef } from "react";
import personService from "../services/persons";
import sendNotification from "../sendNotification";

const PhoneBookForm = ({ persons, setPersons, setNotificationMessage }) => {
	const nameInput = useRef("");
	const numberInput = useRef("");

	const handleSubmit = (e) => {
		e.preventDefault();

		const name = nameInput.current.value;
		const number = numberInput.current.value;

		if (
			persons.find(
				(person) => person.name === name && person.number === number
			)
		)
			return sendNotification(
				setNotificationMessage,
				`${name} with ${number} is already in the phonebook`
			);

		if (persons.find((person) => person.name === name)) {
			const updatePerson = () => {
				if (
					window.confirm(
						`Do you want to update ${name}'s number to ${number}?`
					)
				) {
					const selectedPerson = persons.find(
						(person) => person.name === name
					);

					personService
						.update(selectedPerson.id, {
							...selectedPerson,
							number: number,
						})
						.then((res) => {
							setPersons(
								persons.map((person) =>
									person.id === selectedPerson.id
										? res.data
										: person
								)
							);

							nameInput.current.value = "";
							numberInput.current.value = "";

							sendNotification(
								setNotificationMessage,
								`${name}'s number has been updated to ${number}`
							);
						})
						.catch((err) => {
							personService.getAll().then((res) => {
								setPersons(res.data);
							});

							sendNotification(
								setNotificationMessage,
								`${Object.values(err.response.data.error)}`
							);
						});
				}
			};

			return updatePerson();
		}

		personService
			.create({
				name: name,
				number: number,
			})
			.then((res) => {
				setPersons(persons.concat(res.data));

				nameInput.current.value = "";
				numberInput.current.value = "";

				sendNotification(
					setNotificationMessage,
					`${name} with ${number} has been added to the phonebook`
				);
			})
			.catch((err) =>
				sendNotification(
					setNotificationMessage,
					`${Object.values(err.response.data.error)}`
				)
			);
	};

	return (
		<form className="phonebookForm" onSubmit={handleSubmit}>
			<div className="phonebookFormInputWrapper">
				<input
					placeholder="Name"
					type="text"
					required
					ref={nameInput}
				/>
				<input
					placeholder="Number"
					pattern="([\+\s]?[-]?[\d])+"
					type="text"
					required
					ref={numberInput}
				/>
			</div>
			<button type="submit">Add</button>
		</form>
	);
};

export default PhoneBookForm;
