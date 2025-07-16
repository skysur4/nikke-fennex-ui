import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '@pages/Home';
import Privacy from '@pages/Privacy';
import Histories from '@pages/analytic/Histories';
import User from '@pages/user/User';
import UserEdit from '@pages/user/UserEdit';

export const CommonRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/privacy" element={<Privacy />} />
			{/* <Route path="/histories" element={<Histories />}/> */}
			{/* <Route path="/user" element={<User />} /> */}
			{/* <Route path="/user/edit" element={<UserEdit />} /> */}
		</Routes>
	);
}

export default CommonRoutes;