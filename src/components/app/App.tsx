import "../../index.css";
import Header from '../header/Header';
import Main from '../Main';
import Footer from '../footer/Footer';
import styles from './App.module.css'

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