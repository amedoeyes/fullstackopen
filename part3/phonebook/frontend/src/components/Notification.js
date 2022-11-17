import { useState, useEffect } from "react";

const Notification = ({ notificationMessage, setNotificationMessage }) => {
	const [notificationVisibility, setNotificationVisibility] = useState(false);

	useEffect(() => {
		const showNotificationTimeout = setTimeout(() => {
			setNotificationVisibility(true);
		}, 10);

		const hideNotificationTimeout = setTimeout(() => {
			setNotificationVisibility(false);
		}, 5000);

		return () => {
			clearTimeout(showNotificationTimeout);
			clearTimeout(hideNotificationTimeout);
		};
	}, []);

	const handleClick = () => setNotificationVisibility(false);

	const handleTransitionEnd = () =>
		!notificationVisibility && setNotificationMessage("");

	return (
		<div
			className="notification"
			data-show={notificationVisibility}
			onClick={handleClick}
			onTransitionEnd={handleTransitionEnd}
		>
			<h3>{notificationMessage}</h3>
		</div>
	);
};

export default Notification;
