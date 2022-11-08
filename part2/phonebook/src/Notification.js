import { useState, useEffect } from "react";

const Notifications = ({ notification, setNotification }) => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		const showNotification = setTimeout(() => {
			setShow(true);
		}, 10);

		const hideNotification = setTimeout(() => {
			setShow(false);
		}, 5000);

		return () => {
			clearTimeout(showNotification);
			clearTimeout(hideNotification);
		};
	}, []);

	const handleClick = () => {
		setShow(false);
	};

	const handleTransitionEnd = () => {
		if (!show) setNotification(null);
	};

	return (
		<div
			className="notification"
			data-show={show}
			onClick={handleClick}
			onTransitionEnd={handleTransitionEnd}
		>
			<h3>{notification}</h3>
		</div>
	);
};

export default Notifications;
