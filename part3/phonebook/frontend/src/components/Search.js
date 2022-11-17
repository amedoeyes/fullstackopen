const Search = ({ search, setSearch }) => {
	const handleChange = (e) => setSearch(e.target.value);

	return (
		<input
			className="search"
			placeholder="Search"
			value={search}
			type="search"
			onChange={handleChange}
		/>
	);
};

export default Search;
