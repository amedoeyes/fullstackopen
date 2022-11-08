import CountryName from "./CountryName";
import Weather from "./Weather";

const Countries = ({ search, countries, countryCode, setCountryCode }) => {
	if (!search) return;

	const searchedCountries = countries.filter(
		(country) =>
			country.name.common.toLowerCase().includes(search.toLowerCase()) ||
			Object.values(country.translations)
				.map((translation) => translation.common)
				.some((translation) =>
					translation.toLowerCase().includes(search.toLowerCase())
				)
	);

	if (searchedCountries.length > 10) return <p>too many matches</p>;

	if (searchedCountries.length === 1 || countryCode !== "") {
		const selectedCountry = searchedCountries.find(
			(country) =>
				searchedCountries.length === 1 || country.cca2 === countryCode
		);

		return (
			<>
				<h1>
					<CountryName selectedCountry={selectedCountry} />
				</h1>
				<img
					src={selectedCountry.flags["png"]}
					alt={`flag of ${selectedCountry.name.common}`}
				/>
				<p>Region: {selectedCountry.region}</p>
				{selectedCountry.capital && (
					<p>Capital: {selectedCountry.capital[0]}</p>
				)}
				<p>Area: {selectedCountry.area.toLocaleString()} km2</p>
				<p>Population: {selectedCountry.population.toLocaleString()}</p>

				{selectedCountry.languages && (
					<>
						<h3>Languages:</h3>
						<ul>
							{Object.values(selectedCountry.languages).map(
								(lang, index) => (
									<li
										key={
											Object.keys(
												selectedCountry.languages
											)[index]
										}
									>
										{lang}
									</li>
								)
							)}
						</ul>
					</>
				)}

				<Weather
					lat={selectedCountry.latlng[0]}
					long={selectedCountry.latlng[1]}
				/>
			</>
		);
	}

	return (
		<>
			{searchedCountries.map((country) => (
				<label key={country.name.common}>
					<p>
						<button onClick={() => setCountryCode(country.cca2)}>
							show
						</button>{" "}
						<CountryName selectedCountry={country} />
					</p>
				</label>
			))}
		</>
	);
};
export default Countries;
