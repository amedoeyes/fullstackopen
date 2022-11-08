import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ long, lat }) => {
	const [weather, setWeather] = useState([]);

	useEffect(() => {
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
			)
			.then((res) => setWeather(res.data));
	}, [lat, long]);

	if (weather.length === 0) return;

	return (
		<>
			<h3>Weather</h3>
			<p>Temperature: {weather.main.temp} C</p>
			<img
				src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
				alt={weather.weather[0].description}
			/>
			<p>{weather.weather[0].main}</p>
			<p>Wind: {weather.wind.speed} m/s</p>
		</>
	);
};
export default Weather;
