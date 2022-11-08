const Search = ({ search, setSearch }) => {
	const handleChange = (e) => setSearch(e.target.value);

	return (
		<input
			className="search"
			placeholder="Search"
			value={search}
			type="text"
			onChange={handleChange}
		/>
	);
};

export default Search;
