import React from 'react';
import * as gateway from '../common/Gateway';
import { useNavigate } from "react-router-dom";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
	const [userInfo, setUserInfo] = React.useState({ isLogin: false, email: '', name: '' });
  	const [isLogin, setIsLogin] = React.useState(false);
	const navigate = useNavigate();

	React.useEffect(() => {
		const getUserInfo = async () => {
        	const userData = await gateway.userInfo();
        	if (userData && userData.isLogin) {
          		setUserInfo(userData);
          		setIsLogin(true);
			// } else {
			// 	setUserInfo(userData);
			// 	setIsLogin(false);
			// 	navigate("/");
			}
	    };

	    getUserInfo();

	  }, [navigate]);

  return (
	<UserContext.Provider value={{ userInfo, isLogin }}>
		{children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return React.useContext(UserContext);
};