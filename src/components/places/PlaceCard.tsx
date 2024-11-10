import React, {useState} from "react";
import {ICard, IUserInfo} from "../../utils/api/types";
import styles from "./PlacesCard.module.css"
import {createPortal} from "react-dom";
import Modal from "../popups/modal/Modal";
import {ModalType} from "../popups/modal/type";
import {useAppSelector} from "../../hooks/redux";
import ImagePopup from "../popups/img-popup/ImagePopup";
import ConfirmPopup from "../popups/confirm-popup/ConfirmPopup";

interface IProps {
	card: ICard,
	onCardLike: (cardId: string, isLiked: boolean) => void,
	onCardDelete: (card: ICard) => void,
}

export default function PlaceCard(props: IProps) {
	const currentUser = useAppSelector(state => state.user.userInfo)

	// Определяем, являемся ли мы владельцем текущей карточки
	const isOwn: boolean = props.card.owner._id === currentUser._id;

	// Определяем, есть ли у карточки лайк, поставленный текущим пользователем
	const isLiked: boolean = props.card.likes.some((i: IUserInfo) => i._id === currentUser._id);

	// Создаём переменную, которую после зададим в `className` для кнопки лайка
	const cardLikeButtonClassName: string = (`${styles.likeBtn} ${isLiked && styles.likeBtnActive}`);

	const [showImageModal, setShowImageModal] = useState<boolean>(false);
	const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
	const [selectedCard, setSelectedCard] = useState<ICard | null>(null);

	const handleImageClick = () => {
		setSelectedCard(props.card)
		setShowImageModal(true)
	}

	const closeImageModal = () => {
		setSelectedCard(null)
		closeModals()
	}

	const confirmDeleteCard = () => {
		props.onCardDelete(props.card)
		closeModals()
	}

	const handleDeleteClick = () => {
		setShowConfirmModal(true);
	}

	const handleLikeClick = () => {
		props.onCardLike(props.card._id, isLiked);
	}

	const closeModals = () => {
		setShowImageModal(false)
		setShowConfirmModal(false)
	}

	return (
		<>
			<li className={styles.placeCard}>
				{isOwn && <button type="button" className={styles.removeBtn} onClick={handleDeleteClick}></button>}

				<img
					src={props.card.link}
					alt={props.card.name}
					className={styles.placesImg}
					onClick={handleImageClick}
				/>

				<div className={styles.placeInfo}>
					<h2 className={styles.placeTitle}>{props.card.name}</h2>

					<div className={styles.likeContainer}>
						<button
							type="button"
							className={cardLikeButtonClassName}
							onClick={handleLikeClick}
						></button>

						<p className={styles.likeCounter}>{props.card.likes.length}</p>
					</div>
				</div>
			</li>

			{showImageModal && createPortal(
				<Modal type={ModalType.Image} onClose={closeImageModal}>
					<ImagePopup card={selectedCard} />
				</Modal>,
				document.body
			)}

			{showConfirmModal && createPortal(
				<Modal onClose={closeModals}>
					<ConfirmPopup
						onConfirm={confirmDeleteCard}
						onCancel={closeModals}
					/>
				</Modal>,
				document.body
			)}
		</>

	);
}
