import { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./Countries";

const App = () => {
	const [countries, setCountries] = useState([]);
	const [search, setSearch] = useState("");
	const [countryCode, setCountryCode] = useState("");

	useEffect(() => {
		axios
			.get("https://restcountries.com/v3.1/all")
			.then((res) => setCountries(res.data));
	}, []);

	if (countries.length === 0) return;

	const handleChange = (e) => {
		setSearch(e.target.value);
		setCountryCode("");
	};

	return (
		<>
			<label>
				Search:{" "}
				<input value={search} type="text" onChange={handleChange} />
			</label>
			<Countries
				search={search}
				countries={countries}
				countryCode={countryCode}
				setCountryCode={setCountryCode}
			/>
		</>
	);
};

export default App;
