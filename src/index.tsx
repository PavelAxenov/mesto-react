import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/styles/index.css';
import { store } from './shared/model/store/store';
import { Provider } from 'react-redux';
import App from "./app/ui/App";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<Provider store={store}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>
);
