import { FormEvent } from "react";
import PopupWithForm from "../form-popup/PopupWithForm";
import styles from "../edit-profile/EditProfilePopup.module.css";

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
			<h2 className={styles['popup__title']}>Вы уверены ?</h2>
			<button
				className={`button ${props.isLoading ? styles['button_type_disabled'] : styles['button_type_save']}`}
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
