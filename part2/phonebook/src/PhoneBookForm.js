import { useRef } from "react";
import personService from "./services/persons";

const PhoneBookForm = ({ persons, setPersons, setNotification }) => {
	const nameInput = useRef("");
	const numberInput = useRef("");

	const addPerson = (e) => {
		e.preventDefault();

		const sendNotification = async (msg) => {
			await setNotification(null);
			await setNotification(msg);
		};

		const name = nameInput.current.value;
		const number = numberInput.current.value;

		if (persons.find((p) => p.name === name && p.number === number)) {
			return sendNotification(`${name} and ${number} are already added`);
		} else if (persons.find((p) => p.name === name)) {
			if (
				window.confirm(
					`Do you want to replace ${name}'s number with ${number}?`
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
					})
					.catch(() => {
						personService.getAll().then((res) => {
							setPersons(res.data);
						});
						return sendNotification(
							`${name} has already been deleted`
						);
					});
				return sendNotification(
					`${name}'s number has been replaced with ${number}`
				);
			}
		} else {
			personService
				.create({
					name: name,
					number: number,
					id: persons.length + 1,
				})
				.then((res) => {
					setPersons(persons.concat(res.data));
					nameInput.current.value = "";
					numberInput.current.value = "";
				})
				.catch(() => {
					personService.getAll().then((res) => {
						setPersons(res.data);
					});
					return sendNotification(
						`${name} has already been added with number ${number}`
					);
				});
			return sendNotification(
				`${name} has been added with number ${number}`
			);
		}
	};

	return (
		<div className="addNewPerson">
			<h3>Add a New Person</h3>
			<form onSubmit={addPerson}>
				<input
					placeholder="Name"
					type="text"
					required
					ref={nameInput}
				/>
				<input
					placeholder="Number"
					pattern="[0-9-]+"
					type="text"
					required
					ref={numberInput}
				/>
				<div>
					<button type="submit">Add</button>
				</div>
			</form>
		</div>
	);
};

export default PhoneBookForm;
