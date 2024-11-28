import {ChangeEvent, FormEvent, useCallback, useEffect, useState} from "react";
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

	const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		props.onUpdateAvatar(avatar);
	}, [props.onUpdateAvatar, avatar])

	const handleAvatarLink = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setAvatar(event.target.value);
	}, [avatar])

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
