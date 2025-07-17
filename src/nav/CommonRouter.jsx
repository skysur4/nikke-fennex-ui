import { Route, Routes } from 'react-router-dom';
import Home from '@pages/Home';
import Privacy from '@pages/Privacy';

export const CommonRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/privacy" element={<Privacy />} />
		</Routes>
	);
}

export default CommonRoutes;