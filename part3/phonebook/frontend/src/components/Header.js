import Search from "./Search";
import ToggleThemeButton from "./ToggleThemeButton";

const Header = ({ search, setSearch }) => {
	return (
		<header className="header">
			<div className="headerTextWrapper">
				<ToggleThemeButton />
				<h2 className="headerText">Phonebook</h2>
			</div>
			<div className="headerInputsWrapper">
				<Search search={search} setSearch={setSearch} />
			</div>
		</header>
	);
};

export default Header;
