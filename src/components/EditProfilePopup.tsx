import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { ChangedUserInfo, IUserInfo } from "../utils/api/types";


interface IProps {
	isOpen: boolean,
	onClose: () => void,
	onUpdateUser: (datas: ChangedUserInfo) => void
}

export default function EditProfilePopup(props: IProps) {
	const currentUser: IUserInfo = useContext(CurrentUserContext);

	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');

	useEffect(() => {
		setName(currentUser.name);
		setDescription(currentUser.about);
	}, [currentUser, props.isOpen]);

	function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
		setName((e.target as HTMLInputElement).value);
	}

	function handleDescriptionChange(e: ChangeEvent<HTMLInputElement>) {
		setDescription((e.target as HTMLInputElement).value);
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		props.onUpdateUser({
			name,
			about: description,
		});
	}

	return (
		<PopupWithForm
			title="Редактировать профиль"
			name="edit"
			buttonText="Сохранить"
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
		>
			<label className="popup__form-field">
				<input
					type="text"
					id="popup__input-name"
					name="name"
					className="popup__input popup__input_type_name"
					placeholder="Имя"
					value={name}
					onChange={handleNameChange}
					minLength={2}
					maxLength={400}
					autoComplete="off"
					required
				/>
				<span className="popup__input-error popup__input-name-error"></span>
			</label>

			<label className="popup__form-field">
				<input
					type="text"
					id="popup__input-profession"
					name="about"
					className="popup__input popup__input_type_profession"
					placeholder="Профессия"
					value={description}
					onChange={handleDescriptionChange}
					minLength={2}
					maxLength={400}
					autoComplete="off"
					required
				/>
				<span className="popup__input-error popup__input-profession-error"></span>
			</label>
		</PopupWithForm>
	);
}