import {ChangeEvent, FormEvent, memo, useCallback, useEffect, useState} from "react";
import { InputType, UIInput } from "../../../../shared/ui";
import { FormWrapper } from "../../../../entities/form-wrapper";
import { ChangedCardType } from "../../../../entities/places";

interface IProps {
	onAddPlace: (card: ChangedCardType) => void
}

export const AddPlacePopup = memo((props: IProps) => {
	const { onAddPlace } = props
	const [name, setName] = useState<string>('');
	const [link, setLink] = useState<string>('');

	useEffect(() => {
		setName('');
		setLink('');
	}, []);

	const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		onAddPlace({
			name,
			link,
		})
	}, [onAddPlace, name, link])

	const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
		const target = event.target;
		const value = target.value;
		setName(value);
	}

	const handleLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
		const target = event.target;
		const value = target.value;
		setLink(value);
	}

	return (
		<FormWrapper
			title="Новое место"
			name="add-card"
			buttonText="Добавить"
			onSubmit={handleSubmit}
		>

			<UIInput
				value={name}
				placeholder="Название"
				maxLength={30}
				handleValueChange={handleNameChange}
			/>

			<UIInput
				type={InputType.Url}
				value={link}
				placeholder="Ссылка на картинку"
				handleValueChange={handleLinkChange}
			/>
		</FormWrapper>
	);
})
