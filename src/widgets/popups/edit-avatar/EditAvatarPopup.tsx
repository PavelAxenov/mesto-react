import PopupWithForm from "../form-popup/PopupWithForm";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import UiInput from "../../../shared/ui/input/UIInput";
import {InputType} from "../../../shared/ui/input/types";

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
			<UiInput
				type={InputType.Url}
				value={avatar}
				placeholder="Ссылка на аватар"
				handleValueChange={handleAvatarLink}
			/>
		</PopupWithForm>
	);
}

export default EditAvatarPopup;