import "../styles/index.css";
import Main from '../../pages/Main';
import styles from './App.module.css'
import {Footer, Header} from "../../shared/ui";

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