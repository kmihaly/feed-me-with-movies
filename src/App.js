
import { Routes, Route, Link } from "react-router-dom";

import { Login, Movies } from "./views"

import '@coreui/coreui/dist/css/coreui.min.css'
import './App.scss';

function App() {

	return (
		<main>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="login" element={<Login />} />
				<Route path="movies" element={<Movies />} />
				{/* MovieTV */}
			</Routes>
		</main>
	);
}

export default App;
