import { Routes, Route } from "react-router-dom";

import { Login, Videos } from "./views"
import useApp from "useApp";

import '@coreui/coreui/dist/css/coreui.min.css'
import './App.scss';


function App() {

	const {
		errorMessage,
		isTokenSaved,
		loginLoading,
		loginUser,
		setValidated,
		validated
	} = useApp()

	if (!isTokenSaved()) {
		return <Login 
			errorMessage={errorMessage}
			loginLoading={loginLoading}
			loginUser={loginUser} 
			setValidated={setValidated}
			validated={validated}
		/>
	}

	return (
		<main>
			<Routes>
				<Route path="/" element={<Login 
					errorMessage={errorMessage}
					loginLoading={loginLoading}
					loginUser={loginUser} 
					setValidated={setValidated}
					validated={validated}
				/>} />
				<Route path="login" element={<Login 
					errorMessage={errorMessage}
					loginLoading={loginLoading}
					loginUser={loginUser} 
					setValidated={setValidated}
					validated={validated}
				/>} />
				<Route path="videos" element={<Videos />} />
				{/* MovieTV */}
			</Routes>
		</main>
	);
}

export default App;
