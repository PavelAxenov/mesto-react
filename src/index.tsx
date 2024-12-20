import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/styles/index.css';
import { Provider } from 'react-redux';
import App from "./app/ui/App";
import {store} from "./shared/model/store/store";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<Provider store={store}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>
);
