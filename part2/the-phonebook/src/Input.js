const Input = ({ placeholder, value, pattern, newPerson, setNewPerson }) => (
	<input
		placeholder={placeholder}
		value={newPerson[value]}
		pattern={pattern}
		type="text"
		required
		onChange={(e) => {
			setNewPerson({
				...newPerson,
				[value]: e.target.value,
			});
		}}
	/>
);
export default Input;
