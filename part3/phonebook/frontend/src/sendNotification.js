const sendNotification = (setNotificationMessageState, message) => {
	setNotificationMessageState("");
	setTimeout(() => {
		setNotificationMessageState(message);
	}, 100);
};

export default sendNotification;
