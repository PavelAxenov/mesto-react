import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {InputType, UIInput} from "../../../../shared/ui";
import {PopupWithForm} from "../../../../entities/form-popup";

interface IProps {
	onUpdateAvatar: (avatar: string) => void,
}

export const EditAvatarPopup = (props: IProps) => {
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
