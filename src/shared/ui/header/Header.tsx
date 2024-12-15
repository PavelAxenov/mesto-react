import cls from "./Header.module.css"
import logo from '../ui-icon/icons/logo.svg';
import {UIImage} from "../ui-image/UIImage";

export const Header = () => {
	return (
		<header className={cls.header}>
			<UIImage
				src={logo}
				alt="mesto-logo"
				className={cls.logo}
			/>
		</header>
	);
}
