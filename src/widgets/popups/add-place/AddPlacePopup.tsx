import PopupWithForm from "../form-popup/PopupWithForm";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {InputType} from "../../../shared/ui/input/types";
import UiInput from "../../../shared/ui/input/UIInput";
import {ChangedCardType} from "../../../entities/places";

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

			<UiInput
				value={name}
				placeholder="Название"
				maxLength={30}
				handleValueChange={handleNameChange}
			/>

			<UiInput
				type={InputType.Url}
				value={link}
				placeholder="Ссылка на картинку"
				handleValueChange={handleLinkChange}
			/>
		</PopupWithForm>
	);
}
