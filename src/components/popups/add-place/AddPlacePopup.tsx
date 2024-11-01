import PopupWithForm from "../form-popup/PopupWithForm";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ChangedCard } from "../../../utils/api/types";
import styles from "./AddPlacePopup.module.css"

interface IProps {
	isOpen: boolean,
	onClose: () => void,
	onAddPlace: (card: ChangedCard) => void
}

export default function AddPlacePopup(props: IProps) {
	const [name, setName] = useState<string>('');
	const [link, setLink] = useState<string>('');

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		props.onAddPlace({
			name,
			link,
		})
	}

	useEffect(() => {
		setName('');
		setLink('');
	}, [props.isOpen]);


	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		const target = event.target;
		const value = target.value;
		target.name === 'name' ? setName(value) : setLink(value);
	}

	return (
		<PopupWithForm
			title="Новое место"
			name="add-card"
			buttonText="Добавить"
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
		>

			<label className={styles['popup__form-field']}>
				<input
					type="text"
					id="popup__input-card-name"
					name="name"
					className={styles['popup__input']}
					autoComplete="off"
					placeholder="Название"
					minLength={2}
					maxLength={30}
					onChange={handleChange}
					value={name}
					required
				/>

				<span className={styles['popup__input-error']}></span>
			</label>

			<label className={styles['popup__form-field']}>
				<input
					type="url"
					id="popup__input-card-source"
					name="link"
					className={styles['popup__input']}
					placeholder="Ссылка на картинку"
					autoComplete="off"
					onChange={handleChange}
					value={link}
					required
				/>

				<span className={styles['popup__input-error']}></span>
			</label>
		</PopupWithForm>
	);
}
