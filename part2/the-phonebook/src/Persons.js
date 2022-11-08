import personService from "./services/persons";

const Persons = ({ persons, setPersons, search, setNotification }) => {
	const numbers =
		search === ""
			? persons
			: persons.filter(
					(e) =>
						e.name.toLowerCase().includes(search.toLowerCase()) ||
						e.number.includes(search.toLowerCase())
			  );

	const handleClick = (id, name) => {
		const sendNotification = async (msg) => {
			await setNotification(null);
			await setNotification(msg);
		};

		return () => {
			if (window.confirm(`Do you want to delete ${name}?`)) {
				personService
					.remove(id)
					.then(setPersons(persons.filter((p) => p.id !== id)))
					.catch(() => {
						personService.getAll().then((res) => {
							setPersons(res.data);
						});
						return sendNotification(
							`${name} has already been deleted`
						);
					});
				return sendNotification(`${name} has been deleted`);
			}
		};
	};

	return (
		<div className="numbers">
			<table>
				<tbody>
					<tr className="tableHeader">
						<td>X</td>
						<td>#</td>
						<td>NAMES</td>
						<td>NUMBERS</td>
					</tr>
					{numbers.map((number, index) => (
						<tr key={number.id}>
							<td className="deleteButton">
								<button
									onClick={handleClick(
										number.id,
										number.name
									)}
								>
									X
								</button>
							</td>
							<td>{index + 1}</td>
							<td>{number.name}</td>
							<td>{number.number}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Persons;
