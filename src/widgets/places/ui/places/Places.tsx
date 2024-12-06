import cls from "./Places.module.css";
import {useCallback, useEffect, useState} from "react";
import { CardSkeleton } from "../skeleton/CardSkeleton";
import { createPortal } from "react-dom";
import { Modal, ModalType } from "../../../../entities/modal";
import { ConfirmPopup, ImagePopup } from "../../../../features/popups";
import {classNames, useAppDispatch, useAppSelector, usePaginator} from "../../../../shared/lib";
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
import { PlaceCard } from "../../../../features/place-card";
import { selectUserInfo } from "../../../../entities/user";
import { UIPaginator } from "../../../../shared/ui";

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

	const {
		currentPage,
		currentItems: currentPlaces,
		pageNumbers,
		changeCurrentPage,
		handlePageClick
	} = usePaginator({items: places})

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
	const handleDeleteClick = useCallback((card: ICard) => {
		setShowConfirmModal(true);
		setDeletingCard(card);
	}, [])

	// удаляем карточку
	const handleDeleteCard = useCallback(() => {
		dispatch(deleteCard(deletingCard))
		closeModals()
	}, [dispatch])

	// лайкаем/дизлайкаем карточку
	const handleCardLike = useCallback((cardId: string, isLiked: boolean) => {
		dispatch(changeLikeCardStatus({cardId, isLiked}))
	}, [dispatch])

	const handleImageClick = useCallback((card: ICard) => {
		setSelectedCard(card)
		setShowImageModal(true)
	}, [])

	const closeImageModal = useCallback(() => {
		setSelectedCard(null)
		closeModals()
	}, [])

	const closeModals = useCallback(() => {
		setShowImageModal(false)
		setShowConfirmModal(false)
	}, [])

	if (placesLoadingStatus === 'loading' || !currentUser) {
		return (
			<div className={cls.cards}>
				<CardSkeleton />
			</div>
		)
	}

	if (!places.length) {
		return (
			<div>
				Карточек нет
			</div>
		)
	}

	return (
		<section className={cls.places}>
			<ul className={cls.cards}>
				{currentPlaces.length && currentPlaces.map((card: ICard) => (
					<PlaceCard
						key={card._id}
						card={card}
						onCardLike={handleCardLike}
						onCardDelete={handleDeleteClick}
						onCardClick={handleImageClick}
					/>)
				)}
			</ul>

			<UIPaginator
				pageNumbers={pageNumbers}
				currentPage={currentPage}
				pageClick={handlePageClick}
				prevPageClick={() => changeCurrentPage('prev')}
				nextPageClick={() => changeCurrentPage('next')}
				className={classNames(cls.paginator)}
			/>

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
