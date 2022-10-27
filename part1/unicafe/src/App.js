import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ text, value }) => (
	<tr>
		<td>{text}</td>
		<td>{value}</td>
	</tr>
);

const Statistics = ({ good, neutral, bad }) => {
	const sum = good + neutral + bad;

	if (sum === 0) {
		return <p>no feedback given</p>;
	}

	return (
		<>
			<StatisticLine text="good" value={good} />
			<StatisticLine text="neutral" value={neutral} />
			<StatisticLine text="bad" value={bad} />
			<StatisticLine text="all" value={sum} />
			<StatisticLine text="average" value={(good - bad) / sum} />
			<StatisticLine text="positive" value={(good / sum) * 100} />
		</>
	);
};

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<>
			<h1>give feedback</h1>
			<Button onClick={() => setGood(good + 1)} text="good" />
			<Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
			<Button onClick={() => setBad(bad + 1)} text="bad" />
			<h1>statistics</h1>
			<Statistics good={good} neutral={neutral} bad={bad} />
		</>
	);
};

export default App;
