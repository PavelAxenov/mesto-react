import {IconName, IconSize} from "./types";
import styles from './UIIcon.module.css'
import {memo} from "react";
interface IProps {
	size?: IconSize;
	iconName: IconName
}

const UiIcon = (props: IProps) => {
	const {size = IconSize.Md, iconName} = props;

	const iconPath = require(`./icons/${iconName}.svg`);

	const iconClass = `${styles['ui-icon']} ${styles[`ui-icon-${size}`]}`

	return (
		<img src={iconPath} className={iconClass} alt={iconName} />
	);
};

export default memo(UiIcon);