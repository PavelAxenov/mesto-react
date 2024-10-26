import PopupWithForm from "./PopupWithForm";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface IProps {
	isOpen: boolean,
	onClose: () => void,
	onUpdateAvatar: (avatar: string) => void,
}

export default function EditAvatarPopup(props: IProps) {
	const [avatar, setAvatar] = useState<string>('');

	useEffect(() => {
		setAvatar('');
	}, [props.isOpen])

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		props.onUpdateAvatar(avatar);
	}

	function handleAvatarLink(event: ChangeEvent<HTMLInputElement>) {
		setAvatar(event.target.value);
	}

	return (
		<PopupWithForm
			title="Обновить аватар"
			name="edit-avatar"
			buttonText="Сохранить"
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
		>
			<label className="popup__form-field">
				<input
					type="url"
					id="popup__input-avatar"
					name="link"
					onChange={handleAvatarLink}
					value={avatar}
					className="popup__input popup__input_type_avatar"
					placeholder="Ссылка на аватар"
					autoComplete="off"
					required
				/>
				<span className="popup__input-error popup__input-avatar-error"></span>
			</label>
		</PopupWithForm>
	);
}