import React from "react"
import { ErrorBoundary } from "react-error-boundary"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import App from "./App"
import ErrorFallback from "components/ErrorFallback/ErrorFallback"
import { errorHandler } from "functions"

import "./index.css"

import reportWebVitals from "./reportWebVitals"

const container = document.getElementById("root")
const root = createRoot(container)

root.render(
	<React.StrictMode>
		<ErrorBoundary
			FallbackComponent={ErrorFallback}
			onError={errorHandler}
			onReset={() => window.location.reload()}
		>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ErrorBoundary>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
