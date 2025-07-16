import React, { createContext, useContext, useState, useEffect } from 'react';
import * as gateway from '../common/Gateway';
import { useUser } from '@components/common/UserContext';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
	const { isLogin } = useUser();
	const [eventSource, setEventSource] = useState(null);

	useEffect(() => {
	    const connect = async () => {
			//SSE연결 로직
			const sse = gateway.connectChannel();

			sse.onopen = () => {
				console.log("Channeling opened ...");
			};

			sse.onmessage = async (e) => {
				const res = await e.data;
				const message = JSON.parse(res);

				console.log(message);

			};

			sse.onerror = (e) => {
				console.log("Channeling error", e);
				sse.close();

				if (e.target.readyState === EventSource.CLOSED) {
					console.log("Channel disconnected...");
				}
			};

			sse.onclose = () => {
				console.log("Channeling closed ...");
			}

			setEventSource(sse);
		}

		if (isLogin) {
			connect();
		}

	  }, [isLogin]);

  return (
	<NotificationContext.Provider value={{ eventSource }}>
		{children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};