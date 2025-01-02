import "../styles/index.css";
import cls from './App.module.css'
import { Header } from "./header/Header";
import { Main } from "../../pages";
import { Footer } from "../../shared/ui";
import React, {useEffect} from "react";
import {fetchUser} from "../../entities/user";
import {useAppDispatch} from "../../shared/lib";
import {BrowserRouter, Route, Routes} from "react-router";

const App = () => {
	const dispatch = useAppDispatch()

	// получение информации пользователя
	useEffect(() => {
		dispatch(fetchUser())
	}, [])

	return (
		<div className={cls.app}>
			<div className={cls.page}>
				<Header />

				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/profile" element={<div>profile page</div>} />
				</Routes>

				<Footer />
			</div>
		</div>
	);
}

export default App;