const PersonContent = ({ person }) => {
	return (
		<div className="personContent">
			<p>{person.name}</p>
			<p>{person.number}</p>
		</div>
	);
};

export default PersonContent;
