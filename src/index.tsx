import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/styles/index.css';
import { Provider } from 'react-redux';
import App from "./app/ui/App";
import {store} from "./shared/model/store/store";
import { BrowserRouter, Routes, Route } from "react-router";
import {Main} from "./pages";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<Provider store={store}>
		<BrowserRouter>

			<App />
		</BrowserRouter>

	</Provider>
);
