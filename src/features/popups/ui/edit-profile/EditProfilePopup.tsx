import {FormWrapper} from "../../../../entities/form-wrapper";
import {ChangeEvent, FormEvent, memo, useCallback, useEffect, useState} from "react";
import {UIInput} from "../../../../shared/ui";
import {ChangedUserInfoType} from "../../../../entities/user";

interface IProps {
	userName: string,
	userDescription: string,
	onUpdateUser: (data: ChangedUserInfoType) => void
}

export const EditProfilePopup = memo((props: IProps) => {
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');

	useEffect(() => {
		setName(props.userName);
		setDescription(props.userDescription);
	}, []);

	const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setName((e.target as HTMLInputElement).value);
	}, [name])

	const handleDescriptionChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setDescription((e.target as HTMLInputElement).value);
	}, [description])

	const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		props.onUpdateUser({
			name,
			about: description,
		});
	}, [props.onUpdateUser, name, description])

	return (
		<FormWrapper
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
		</FormWrapper>
	);
})