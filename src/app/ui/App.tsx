import "../styles/index.css";
import Header from '../../shared/ui/header/Header';
import Main from '../../pages/Main';
import Footer from '../../shared/ui/footer/Footer';
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