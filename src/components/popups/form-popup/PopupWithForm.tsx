import {FormEvent, ReactNode} from "react";
import styles from './PopupWithForm.module.css'
interface IProps {
	name: string,
	title?: string,
	buttonText?: string,
	onSubmit: (e: FormEvent<HTMLFormElement>) => void,
	children: ReactNode
}

export default function PopupWithForm(props: IProps) {
	return (
		<>
			<h3 className={styles.formTitle}>{props.title}</h3>

			<form
				className={styles.form}
				name={props.name}
				onSubmit={props.onSubmit}
			>
				{props.children}

				<button type="submit" className={styles.submitBtn}>
					{props.buttonText}
				</button>
			</form>
		</>
	);
}
