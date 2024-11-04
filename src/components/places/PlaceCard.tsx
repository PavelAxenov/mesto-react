import React, {useContext, useState} from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import {ICard, IUserInfo} from "../../utils/api/types";
import styles from "./PlacesCard.module.css"
import {createPortal} from "react-dom";
import ImagePopup from "../popups/img-popup/ImagePopup";
import Modal from "../popups/modal/Modal";
import {ModalType} from "../popups/modal/type";

interface IProps {
	card: ICard,
	onCardLike: (card: ICard) => void,
	onCardDelete: (card: ICard) => void,
}

export default function PlaceCard(props: IProps) {
	const currentUser = useContext(CurrentUserContext);

	// Определяем, являемся ли мы владельцем текущей карточки
	const isOwn: boolean = props.card.owner._id === currentUser._id;

	// Определяем, есть ли у карточки лайк, поставленный текущим пользователем
	const isLiked: boolean = props.card.likes.some((i: IUserInfo) => i._id === currentUser._id);

	// Создаём переменную, которую после зададим в `className` для кнопки лайка
	const cardLikeButtonClassName: string = (`${styles['places__like-button']} ${isLiked && styles['places__like-button_active']}`);

	const [showModal, setShowModal] = useState<boolean>(false);
	const [selectedCard, setSelectedCard] = useState<ICard | null>(null);

	function handleClick() {
		setSelectedCard(props.card)
		setShowModal(true)
	}

	function closeModal() {
		setShowModal(false)
		setSelectedCard(null)
	}

	function handleLikeClick() {
		props.onCardLike(props.card);
	}

	function handleDeleteClick() {
		props.onCardDelete(props.card);
	}

	return (
		<>
			<li className={styles.places__card}>
				{isOwn && <button type="button" className={styles['remove-button']} onClick={handleDeleteClick}></button>}

				<img
					src={props.card.link}
					alt={props.card.name}
					className={styles.places__image}
					onClick={handleClick}
				/>

				<div className={styles['places__text-wrap']}>
					<h2 className={styles.places__text}>{props.card.name}</h2>
					<div className={styles['places__like-container']}>
						<button
							type="button"
							className={cardLikeButtonClassName}
							onClick={handleLikeClick}
						></button>

						<p className={styles['places__like-counter']}>{props.card.likes.length}</p>
					</div>
				</div>
			</li>

			{showModal && createPortal(
				<Modal type={ModalType.Image} onClose={closeModal}>
					<ImagePopup card={selectedCard} />
				</Modal>,
				document.body
			)}
		</>

	);
}
