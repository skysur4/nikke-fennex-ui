import '@styles/ui/Alert.scss';

import React from 'react';
import NotificationIcon from '@mui/icons-material/NotificationImportant';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';

const Alert = ({text, visible, type, onClose }) => {

	const [isVisible, setIsVisible] = React.useState(visible);

	React.useEffect(() => {
		if (visible) {
			setIsVisible(true);
      		const timer = setTimeout(() => {
				setIsVisible(false);
        		onClose && onClose();
      	}, 3000);
      		return () => clearTimeout(timer);
    	}
	}, [visible, onClose]);

	let icon = <NotificationIcon />

	if(type === "info") {
		icon = <InfoIcon />
	} else if(type === "warn") {
		icon = <WarningIcon />
	} else if(type === "error") {
		icon = <ErrorIcon />
	} else {
		icon = <NotificationIcon />
	}

	return (
		<div className={`alert ${isVisible ? 'visible' : ''} ${!type ? '' : type}`}>
			{icon} {text}
		</div>
	);
};

export default Alert;