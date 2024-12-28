import "../styles/index.css";
import cls from './App.module.css'
import { Header } from "./header/Header";
import { Main } from "../../pages";
import { Footer } from "../../shared/ui";
import {useEffect} from "react";
import {fetchUser} from "../../entities/user";
import {useAppDispatch} from "../../shared/lib";

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

				<Main />

				<Footer />
			</div>
		</div>
	);
}

export default App;