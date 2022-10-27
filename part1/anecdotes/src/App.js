import { useRef, useState } from "react";

const AnecdoteHighest = ({ anecdotes, points }) => {
	const highest = useRef([0, 0]);

	Object.entries(points).forEach((e) => {
		if (e[1] > highest.current[1]) {
			highest.current = e;
		}
	});

	if (highest.current[1] === 0) {
		return;
	}

	return (
		<>
			<h1>Anecdote with most votes</h1>
			<p>{anecdotes[highest.current[0]]}</p>
			<p>has {highest.current[1]} votes</p>
		</>
	);
};

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often.",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
	];

	const rand = () => Math.floor(Math.random() * anecdotes.length);

	const [selected, setSelected] = useState(rand);
	const [points, setPoints] = useState({ ...anecdotes.map((e) => (e = 0)) });

	const handleRandom = () => setSelected(rand);
	const handleVote = () => {
		const copy = { ...points };
		++copy[selected];
		return setPoints(copy);
	};

	return (
		<>
			<h1>Anecdote of the day</h1>
			<p>{anecdotes[selected]}</p>
			<p>has {points[selected]} votes</p>
			<button onClick={handleVote}>vote</button>
			<button onClick={handleRandom}>next anecdote</button>

			<AnecdoteHighest anecdotes={anecdotes} points={points} />
		</>
	);
};

export default App;
