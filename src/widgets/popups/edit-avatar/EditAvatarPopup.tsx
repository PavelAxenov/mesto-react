import PopupWithForm from "../form-popup/PopupWithForm";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {UIInput, InputType} from "../../../shared";

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
			<UIInput
				type={InputType.Url}
				value={avatar}
				placeholder="Ссылка на аватар"
				handleValueChange={handleAvatarLink}
			/>
		</PopupWithForm>
	);
}

export default EditAvatarPopup;