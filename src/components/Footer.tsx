export default function Footer() {
	const currentYear: number = new Date().getFullYear();

	return (
		<footer className="footer">
			<p className="footer__copyright">&#169; {currentYear} Mesto Russia</p>
		</footer>
	);
}
