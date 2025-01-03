import {ChangeEvent, FormEvent, useCallback, useEffect, useState} from "react";
import {InputType, UIInput} from "../../../../shared/ui";
import {FormWrapper} from "../../../../entities/form-wrapper";

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
		<FormWrapper
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
		</FormWrapper>
	);
}
