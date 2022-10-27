const Header = ({ course }) => (
	<>
		<h1>{course}</h1>
	</>
);

const Part = ({ name, exercises }) => (
	<>
		<p>
			{name} {exercises}
		</p>
	</>
);

const Content = ({ parts }) => {
	let key = Number();

	return (
		<>
			{parts.map((part) => (
				<Part key={key++} {...part} />
			))}
		</>
	);
};

const Total = ({ parts }) => {
	const exercises = () => {
		let num = Number();

		parts.forEach((part) => {
			num += part.exercises;
		});

		return num;
	};

	return <p>Number of exercises {exercises()}</p>;
};

const App = () => {
	const course = {
		name: "Half Stack application development",
		parts: [
			{
				name: "Fundamentals of React",
				exercises: 10,
			},
			{
				name: "Using props to pass data",
				exercises: 7,
			},
			{
				name: "State of a component",
				exercises: 14,
			},
		],
	};

	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	);
};

export default App;
