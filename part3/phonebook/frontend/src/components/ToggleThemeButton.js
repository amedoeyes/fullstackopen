import { useState } from "react";
import theme from "../theme";

const ToggleThemeButton = () => {
	const [buttonBody, setButtonBody] = useState(theme.getTheme());
	const handleClick = () => {
		theme.toggleTheme();
		setButtonBody(theme.getTheme());
	};

	return (
		<button className="toggleThemeButton" onClick={handleClick}>
			{buttonBody === "light" ? "Dark" : "Light"}
		</button>
	);
};

export default ToggleThemeButton;
