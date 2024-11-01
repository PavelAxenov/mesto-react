import {FormEvent, ReactNode} from "react";
import styles from './PopupWithForm.module.css'
interface IProps {
	name: string,
	isOpen: boolean,
	title?: string,
	buttonText?: string,
	onClose: () => void,
	onSubmit: (e: FormEvent<HTMLFormElement>) => void,
	children: ReactNode
}

export default function PopupWithForm(props: IProps) {
	return (
		<>
			<div className={styles.popup}>
				<div className={styles.popup__container}>
					<h3 className={styles.popup__title}>{props.title}</h3>
					<form
						className={styles.popup__form}
						name={props.name}
						onSubmit={props.onSubmit}
					>
						{props.children}
						<button type="submit" className={styles['popup__submit-button']}>
							{props.buttonText}
						</button>
					</form>
					<button
						aria-label="Закрыть"
						type="button"
						className={styles['popup__close-button']}
						onClick={props.onClose}>
					</button>
				</div>
			</div>
		</>
	);
}
