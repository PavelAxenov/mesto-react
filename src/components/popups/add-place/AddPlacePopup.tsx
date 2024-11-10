import PopupWithForm from "../form-popup/PopupWithForm";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ChangedCardType } from "../../../utils/api/types";
import styles from "./AddPlacePopup.module.css"

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

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const target = event.target;
		const value = target.value;
		target.name === 'name' ? setName(value) : setLink(value);
	}

	return (
		<PopupWithForm
			title="Новое место"
			name="add-card"
			buttonText="Добавить"
			onSubmit={handleSubmit}
		>

			<input
				type="text"
				id="input-card-name"
				name="name"
				className={styles.input}
				autoComplete="off"
				placeholder="Название"
				minLength={2}
				maxLength={30}
				onChange={handleChange}
				value={name}
				required
			/>

			<input
				type="url"
				id="input-card-source"
				name="link"
				className={styles.input}
				placeholder="Ссылка на картинку"
				autoComplete="off"
				onChange={handleChange}
				value={link}
				required
			/>
		</PopupWithForm>
	);
}
