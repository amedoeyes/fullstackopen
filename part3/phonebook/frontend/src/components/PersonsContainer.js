import { useEffect, useRef } from "react";
import Persons from "./Persons";

const PersonsContainer = ({
	persons,
	setPersons,
	search,
	setNotificationMessage,
}) => {
	const personsRef = useRef();
	const prevNotesLength = useRef(persons.length);

	useEffect(() => {
		const calculateHeight = () => {
			const headerHeight = document.querySelector(".header").clientHeight;
			const noteFormHeight =
				document.querySelector(".phonebookForm").clientHeight;

			return window.innerHeight - headerHeight - noteFormHeight;
		};

		personsRef.current.style.maxHeight = calculateHeight() + "px";

		window.onresize = () =>
			(personsRef.current.style.maxHeight = calculateHeight() + "px");

		personsRef.current.scrollTo({
			top: personsRef.current.scrollHeight,
			left: 0,
			behavior: "smooth",
		});
	}, []);

	useEffect(() => {
		persons.length > prevNotesLength.current &&
			personsRef.current.scrollTo({
				top: personsRef.current.scrollHeight,
				left: 0,
				behavior: "smooth",
			});

		prevNotesLength.current = persons.length;
	}, [persons]);

	return (
		<div ref={personsRef} className="personsContainer">
			<Persons
				persons={persons}
				setPersons={setPersons}
				search={search}
				setNotificationMessage={setNotificationMessage}
			/>
		</div>
	);
};

export default PersonsContainer;
