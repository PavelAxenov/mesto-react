import {FormEvent, memo, ReactNode} from "react";
import cls from './PopupWithForm.module.css'
import {ButtonSize, ButtonType, UIButton} from "../../../shared/ui";

interface IProps {
	name: string,
	title?: string,
	buttonText?: string,
	onSubmit: (e: FormEvent<HTMLFormElement>) => void,
	children: ReactNode
}

export const PopupWithForm = memo((props: IProps) => {
	return (
		<>
			<h3 className={cls.formTitle}>{props.title}</h3>

			<form
				className={cls.form}
				name={props.name}
				onSubmit={props.onSubmit}
			>
				{props.children}

				<UIButton
					text={props.buttonText}
					size={ButtonSize.Md}
					type={ButtonType.Submit}
				/>
			</form>
		</>
	);
})
