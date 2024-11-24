import styles from "./Header.module.css"
import logo from '../icon/icons/logo.svg';

export const Header = () => {
	return (
		<header className={styles.header}>
			<img src={logo} alt="mesto-logo" className={styles.img}/>
		</header>
	);
}
