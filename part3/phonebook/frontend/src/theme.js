class Theme {
	#preferredDarkTheme;
	#chosenTheme;
	#theme;

	getTheme() {
		this.#preferredDarkTheme = window.matchMedia(
			"(prefers-color-scheme: dark)"
		).matches;
		this.#chosenTheme = localStorage.getItem("theme");
		this.#theme = this.#chosenTheme
			? this.#chosenTheme
			: this.#preferredDarkTheme
			? "dark"
			: "light";
		return this.#theme;
	}

	setTheme() {
		document.body.classList.add(this.getTheme());
	}

	toggleTheme() {
		const bodyClassList = document.body.classList;
		if (this.getTheme() === "light") {
			bodyClassList.remove("light");
			bodyClassList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			bodyClassList.remove("dark");
			bodyClassList.add("light");
			localStorage.setItem("theme", "light");
		}
	}
}

const theme = new Theme();

export default theme;
