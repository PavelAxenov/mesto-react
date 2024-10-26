import {FormEvent, ReactNode} from "react";

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
		<section>
			<div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_is-opened" : ""}`}>
				<div className="popup__container">
					<h3 className="popup__title">{props.title}</h3>
					<form
						className={`popup__form popup__form_${props.name}`}
						name={props.name}
						onSubmit={props.onSubmit}
					>
						{props.children}
						<button type="submit" className="popup__submit-button">
							{props.buttonText}
						</button>
					</form>
					<button
						aria-label="Закрыть"
						type="button"
						className="popup__close-button"
						onClick={props.onClose}>
					</button>
				</div>
			</div>
		</section>
	);
}
