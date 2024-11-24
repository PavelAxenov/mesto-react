import {PopupWithForm} from "../../../../entities/form-popup";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {ChangedUserInfoType} from "../../../../widgets/profile";
import {UIInput} from "../../../../shared/ui";

interface IProps {
	userName: string,
	userDescription: string,
	onUpdateUser: (data: ChangedUserInfoType) => void
}

export const EditProfilePopup = (props: IProps) => {
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
			<UIInput
				value={name}
				placeholder="Имя"
				handleValueChange={handleNameChange}
				maxLength={400}
			/>
			<UIInput
				value={description}
				placeholder="Профессия"
				handleValueChange={handleDescriptionChange}
				maxLength={400}
			/>
		</PopupWithForm>
	);
}