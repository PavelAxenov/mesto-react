import cls from "./Footer.module.css"

export const Footer = () => {
	const currentYear: number = new Date().getFullYear();

	return (
		<footer className={cls.footer}>
			<p className={cls.footer__date}>&#169; {currentYear} Mesto Russia</p>
		</footer>
	);
}
