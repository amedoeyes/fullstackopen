import Search from "./Search";

const Header = ({ search, setSearch }) => {
	return (
		<header className="header">
			<h2>Phonebook</h2>
			<Search search={search} setSearch={setSearch} />
		</header>
	);
};

export default Header;
