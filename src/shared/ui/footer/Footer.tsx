import styles from "./Footer.module.css"

export const Footer = () => {
	const currentYear: number = new Date().getFullYear();

	return (
		<footer className={styles.footer}>
			<p className={styles.footer__date}>&#169; {currentYear} Mesto Russia</p>
		</footer>
	);
}
