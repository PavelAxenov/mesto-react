import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import PopupWithForm from "../form-popup/PopupWithForm";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { ChangedUserInfo, IUserInfo } from "../../../utils/api/types";
import styles from "./EditProfilePopup.module.css"

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
			<label className={styles['popup__form-field']}>
				<input
					type="text"
					id="popup__input-name"
					name="name"
					className={styles['popup__input']}
					placeholder="Имя"
					value={name}
					onChange={handleNameChange}
					minLength={2}
					maxLength={400}
					autoComplete="off"
					required
				/>
				<span className={styles['popup__input-error']}></span>
			</label>

			<label className={styles['popup__form-field']}>
				<input
					type="text"
					id="popup__input-profession"
					name="about"
					className={styles['popup__input']}
					placeholder="Профессия"
					value={description}
					onChange={handleDescriptionChange}
					minLength={2}
					maxLength={400}
					autoComplete="off"
					required
				/>
				<span className={styles['popup__input-error']}></span>
			</label>
		</PopupWithForm>
	);
}