import "../styles/index.css";
import cls from './App.module.css'
import {Footer, Header} from "../../shared/ui";
import {Main} from "../../pages";

const App = () => {
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