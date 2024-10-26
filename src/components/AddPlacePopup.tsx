import PopupWithForm from "./PopupWithForm";
import React, {ChangeEvent, FormEvent} from "react";
import {ChangedCard, ChangedUserInfo, ICard} from "../utils/api/types";


interface IProps {
	isOpen: boolean,
	onClose: () => void,
	onAddPlace: (card: ChangedCard) => void
}

export default function AddPlacePopup(props: IProps) {
	const [name, setName] = React.useState<string>('');
	const [link, setLink] = React.useState<string>('');

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		props.onAddPlace({
			name,
			link,
		})
	}

	React.useEffect(() => {
		setName('');
		setLink('');
	}, [props.isOpen]);


	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		const target = event.target;
		const value = target.value;
		target.name === 'name' ? setName(value) : setLink(value);
	}

	return (
		<PopupWithForm
			title="Новое место"
			name="add-card"
			buttonText="Добавить"
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
		>

			<label className="popup__form-field">
				<input
					type="text"
					id="popup__input-card-name"
					name="name"
					className="popup__input popup__input_type_card-name"
					autoComplete="off"
					placeholder="Название"
					minLength={2}
					maxLength={30}
					onChange={handleChange}
					value={name}
					required
				/>

				<span className="popup__input-error popup__input-card-name-error"></span>
			</label>

			<label className="popup__form-field">
				<input
					type="url"
					id="popup__input-card-source"
					name="link"
					className="popup__input popup__input_type_card-source"
					placeholder="Ссылка на картинку"
					autoComplete="off"
					onChange={handleChange}
					value={link}
					required
				/>

				<span className="popup__input-error popup__input-card-source-error"></span>
			</label>
		</PopupWithForm>
	);
}
