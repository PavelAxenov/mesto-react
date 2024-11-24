import PopupWithForm from "../form-popup/PopupWithForm";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {ChangedCardType} from "../../../entities/places";
import {InputType, UIInput} from "../../../shared";

interface IProps {
	onAddPlace: (card: ChangedCardType) => void
}

export default function AddPlacePopup(props: IProps) {
	const [name, setName] = useState<string>('');
	const [link, setLink] = useState<string>('');

	useEffect(() => {
		setName('');
		setLink('');
	}, []);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		props.onAddPlace({
			name,
			link,
		})
	}

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
		<PopupWithForm
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
		</PopupWithForm>
	);
}
