import React from 'react';
import * as gateway from '../common/Gateway';
import { useNavigate } from "react-router-dom";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
	const [userInfo, setUserInfo] = React.useState({ isLogin: false, email: '', name: '' });
  	const [isLogin, setIsLogin] = React.useState(false);
	const [isAdmin, setIsAdmin] = React.useState(false);
	const navigate = useNavigate();

	React.useEffect(() => {
		const getUserInfo = async () => {
        	const userData = await gateway.userInfo();

			setUserInfo(userData);
			setIsLogin(userData.isLogin);
			setIsAdmin(userData.isAdmin);
	    };

	    getUserInfo();

	  }, [navigate]);

  return (
	<UserContext.Provider value={{ userInfo, isLogin, isAdmin }}>
		{children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return React.useContext(UserContext);
};