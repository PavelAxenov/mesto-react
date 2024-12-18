import cls from "./Header.module.css"
import logo from '../ui-icon/icons/logo.svg';

export const Header = () => {
	return (
		<header className={cls.header}>
			<img
				src={logo}
				alt="mesto-logo"
				className={cls.logo}
			/>
		</header>
	);
}
