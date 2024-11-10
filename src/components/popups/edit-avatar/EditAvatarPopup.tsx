import PopupWithForm from "../form-popup/PopupWithForm";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./EditAvatarPopup.module.css"

interface IProps {
	onUpdateAvatar: (avatar: string) => void,
}

const EditAvatarPopup = (props: IProps) => {
	const [avatar, setAvatar] = useState<string>('');

	useEffect(() => {
		setAvatar('');
	}, [])

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		props.onUpdateAvatar(avatar);
	}

	const handleAvatarLink = (event: ChangeEvent<HTMLInputElement>) => {
		setAvatar(event.target.value);
	}

	return (
		<PopupWithForm
			title="Обновить аватар"
			name="edit-avatar"
			buttonText="Сохранить"
			onSubmit={handleSubmit}
		>
			<input
				type="url"
				id="edit-avatar-input"
				name="link"
				onChange={handleAvatarLink}
				value={avatar}
				className={styles.linkInput}
				placeholder="Ссылка на аватар"
				autoComplete="off"
				required
			/>
		</PopupWithForm>
	);
}

export default EditAvatarPopup;