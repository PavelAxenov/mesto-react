import styles from './UIButton.module.css'
import {ButtonSize, ButtonType, ButtonVariant} from "./types";
import {memo} from "react";

interface IProps {
	text: string;
	size?: ButtonSize;
	variant?: ButtonVariant;
	type?: ButtonType;
	onClick?: () => void;
}

const UiButton = (props: IProps) => {
	const { text, size = ButtonSize.Md, variant = ButtonVariant.Default, type = ButtonType.Default } = props;

	const btnClass = `${styles['ui-button']} ${styles[`ui-button-${size}`]} ${styles[`ui-button-${variant}`]}`

	return (
		<button
			className={btnClass}
			type={type}
			onClick={props.onClick}
		>
			{text}
		</button>
	);
};

export default memo(UiButton);