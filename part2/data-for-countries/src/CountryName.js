const CountryName = ({ selectedCountry }) => {
	const countryName = selectedCountry.name.common;
	const countryNativeNames = Object.values(selectedCountry.name.nativeName);
	let countryNativeName = "";

	if (selectedCountry.name.nativeName) {
		if (countryName !== countryNativeNames[0].common) {
			countryNativeName = countryNativeNames[0].common;
		} else if (
			countryName === countryNativeNames[0].common &&
			countryNativeNames.length > 1 &&
			countryName !== countryNativeNames[1].common
		) {
			countryNativeName = countryNativeNames[1].common;
		}
	}

	return (
		<>
			{countryName}
			{countryNativeName.length > 0 && <> | {countryNativeName}</>}
		</>
	);
};
export default CountryName;
