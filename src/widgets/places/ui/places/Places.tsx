import styles from "./Places.module.css";
import { useEffect, useState } from "react";
import { CardSkeleton } from "../skeleton/CardSkeleton";
import { createPortal } from "react-dom";
import ConfirmPopup from "../../../../features/popups/ui/confirm-popup/ConfirmPopup";
import { Modal, ModalType } from "../../../../entities/modal";
import { ImagePopup } from "../../../../features/popups";
import { useAppDispatch, useAppSelector } from "../../../../shared/lib";
import {
	changeLikeCardStatus,
	deleteCard,
	fetchCards,
	ICard,
	selectDeletedCard,
	selectLikedCard,
	selectPlaces,
	selectPlacesLoadingStatus,
	setCardsByDelete,
	setCardsByLike,
	setDeletedCard,
	setLikedCard
} from "../../../../entities/places";
import {PlaceCard} from "../../../../features/place-card";
import {selectUserInfo} from "../../../../entities/user";

export const Places = () => {
	const dispatch = useAppDispatch()

	const currentUser = useAppSelector(selectUserInfo)

	const places = useAppSelector(selectPlaces)
	const placesLoadingStatus = useAppSelector(selectPlacesLoadingStatus)
	const likedCard = useAppSelector(selectLikedCard)
	const deletedCard = useAppSelector(selectDeletedCard)


	const [showImageModal, setShowImageModal] = useState<boolean>(false);
	const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
	const [selectedCard, setSelectedCard] = useState<ICard | null>(null);
	const [deletingCard, setDeletingCard] = useState<ICard | null>(null);

	// получение карточек
	useEffect(() => {
		dispatch(fetchCards())
	}, [])

	// меняем массив карточек когда произошло удаление карточки
	useEffect(() => {
		if (deletedCard) {
			dispatch(setCardsByDelete(deletedCard._id));
			dispatch(setDeletedCard(null));
			setDeletingCard(null)
		}
	}, [deletedCard])

	// меняем массив карточек когда произошел лайк/дизлайк
	useEffect(() => {
		if (likedCard) {
			dispatch(setCardsByLike(likedCard));
			dispatch(setLikedCard(null));
		}
	}, [likedCard])

	// открываем окно подтверждения удаления карточки
	const handleDeleteClick = (card: ICard) => {
		setShowConfirmModal(true);
		setDeletingCard(card);
	}

	// удаляем карточку
	const handleDeleteCard = () => {
		dispatch(deleteCard(deletingCard))
		closeModals()
	}

	// лайкаем/дизлайкаем карточку
	const handleCardLike = (cardId: string, isLiked: boolean) => {
		dispatch(changeLikeCardStatus({cardId, isLiked}))
	}

	const handleImageClick = (card: ICard) => {
		setSelectedCard(card)
		setShowImageModal(true)
	}

	const closeImageModal = () => {
		setSelectedCard(null)
		closeModals()
	}

	const closeModals = () => {
		setShowImageModal(false)
		setShowConfirmModal(false)
	}

	if (placesLoadingStatus === 'loading' && !currentUser) {
		return (
			<div className={styles.cards}>
				<CardSkeleton />
			</div>
		)
	}

	if (!places || !places.length) {
		return (
			<div>
				Карточек нет
			</div>
		)
	}

	return (
		<section className={styles.places}>
			<ul className={styles.cards}>
				{places.length && places.map((card: ICard) => (
					<PlaceCard
						key={card._id}
						card={card}
						onCardLike={handleCardLike}
						onCardDelete={handleDeleteClick}
						onCardClick={handleImageClick}
					/>)
				)}
			</ul>

			{showImageModal && createPortal(
				<Modal type={ModalType.Image} onClose={closeImageModal}>
					<ImagePopup card={selectedCard} />
				</Modal>,
				document.body
			)}

			{showConfirmModal && createPortal(
				<Modal onClose={closeModals}>
					<ConfirmPopup
						onConfirm={handleDeleteCard}
						onCancel={closeModals}
					/>
				</Modal>,
				document.body
			)}
		</section>
	)
}
