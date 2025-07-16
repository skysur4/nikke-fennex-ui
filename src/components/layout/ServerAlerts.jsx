import * as React from 'react';
import { useNotification } from '@components/common/NotificationContext';
import Alert from '@components/ui/Alert';

const ServerAlerts = () => {
	const { eventSource } = useNotification();
	const [type, setType] = React.useState('');
	const [alertText, setAlertText] = React.useState(''); // alert
	const [isAlertVisible, setIsAlertVisible] = React.useState(false); // alert visible

	const showAlert = (type, message) => {
		setAlertText(message);
		setType(type);
		setIsAlertVisible(true);

		setTimeout(() => {
			setIsAlertVisible(false);
		}, 2000);
	};

	React.useEffect(() => {
		if(eventSource){
			eventSource.addEventListener('notify', (e) => {
				const res = e.data;
				const notification = JSON.parse(res);

				if(notification.type === 'initialize'){
					console.log(notification.message);
				} else {
					showAlert(notification.type, notification.message);
				}
			});
		}

	}, [eventSource]);

  return (
		<Alert text={alertText} visible={isAlertVisible} type={type} />
  );
}

export default ServerAlerts;
