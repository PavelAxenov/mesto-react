import cls from './UIButton.module.css'
import {ButtonSize, ButtonType, ButtonVariant} from "./types";
import {memo} from "react";

interface IProps {
	text: string;
	size?: ButtonSize;
	variant?: ButtonVariant;
	type?: ButtonType;
	onClick?: () => void;
}

export const UIButton = memo((props: IProps) => {
	const { text, size = ButtonSize.Md, variant = ButtonVariant.Default, type = ButtonType.Default } = props;

	const btnClass = `${cls['ui-button']} ${cls[`ui-button-${size}`]} ${cls[`ui-button-${variant}`]}`

	return (
		<button
			className={btnClass}
			type={type}
			onClick={props.onClick}
		>
			{text}
		</button>
	);
});
