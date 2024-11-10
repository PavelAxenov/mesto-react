import PopupWithForm from "../form-popup/PopupWithForm";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ChangedUserInfoType } from "../../../utils/api/types";
import styles from "./EditProfilePopup.module.css"

interface IProps {
	userName: string,
	userDescription: string,
	onUpdateUser: (data: ChangedUserInfoType) => void
}

export default function EditProfilePopup(props: IProps) {
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');

	useEffect(() => {
		setName(props.userName);
		setDescription(props.userDescription);
	}, []);

	const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setName((e.target as HTMLInputElement).value);
	}

	const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
		setDescription((e.target as HTMLInputElement).value);
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
			onSubmit={handleSubmit}
		>
			<input
				type="text"
				id="input-name"
				name="name"
				className={styles.input}
				placeholder="Имя"
				value={name}
				onChange={handleNameChange}
				minLength={2}
				maxLength={400}
				autoComplete="off"
				required
			/>

			<input
				type="text"
				id="popup__input-profession"
				name="about"
				className={styles.input}
				placeholder="Профессия"
				value={description}
				onChange={handleDescriptionChange}
				minLength={2}
				maxLength={400}
				autoComplete="off"
				required
			/>
		</PopupWithForm>
	);
}