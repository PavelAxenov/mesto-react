import { FormEvent } from "react";
import PopupWithForm from "./PopupWithForm";

interface IProps {
	name: string,
	isOpen: boolean,
	isLoading: boolean,
	onClose: () => void,
	onCardDelete: () => void,
}

function DeleteCardPopup(props: IProps) {
	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		props.onCardDelete();
	}

	return (
		<PopupWithForm
			isOpen={props.isOpen}
			onSubmit={handleSubmit}
			onClose={props.onClose}
			name={props.name}
		>
			<h2 className="popup__title popup__title_type_photo">Вы уверены ?</h2>
			<button
				className={`button button_type_save ${props.isLoading ? "button_type_disabled" : "button_type_save"}`}
				type="submit"
				name="button"
				value="yes"
				disabled={props.isLoading}
			>
				{props.isLoading ? "Удаление..." : "Да"}
			</button>
		</PopupWithForm>
	);
}

export default DeleteCardPopup;
