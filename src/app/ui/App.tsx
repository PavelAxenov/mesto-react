import "../styles/index.css";
import styles from './App.module.css'
import {Footer, Header} from "../../shared/ui";
import {Main} from "../../pages";

const App = () => {
	return (
		<div className={styles.app}>
			<div className={styles.page}>
				<Header />

				<Main />

				<Footer />
			</div>
		</div>
	);
}

export default App;