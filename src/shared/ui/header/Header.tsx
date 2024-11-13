import styles from "./Header.module.css"

export default function Header() {
	return (
		<header className={styles.header}>
			<img src={require("../icon/icons/logo.svg").default} alt="mesto-logo"/>
		</header>
	);
}
