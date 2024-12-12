import cls from "./Places.module.css";
import {useCallback, useEffect, useMemo, useState} from "react";
import { CardSkeleton } from "../skeleton/CardSkeleton";
import { createPortal } from "react-dom";
import { Modal, ModalType } from "../../../../entities/modal";
import { ConfirmPopup, ImagePopup } from "../../../../features/popups";
import { classNames, useAppDispatch, useAppSelector } from "../../../../shared/lib";
import {
	changeLikeCardStatus,
	deleteCard,
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
import {IDropdownItem, UIDropdown, UIPaginator} from "../../../../shared/ui";

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

	const [currentPage, setCurrentPage] = useState(1)


	const ITEMS_PER_PAGE: IDropdownItem[] = [
		{
			name: '3',
			value: '3',
			isAvailable: true
		},
		{
			name: '5',
			value: '5',
			isAvailable: true
		},
		{
			name: '10',
			value: '10',
			isAvailable: true
		},
	]
	const [ selectedItem, setSelectedItem ] = useState<IDropdownItem>(ITEMS_PER_PAGE[1])
	const [itemsPerPage, setItemsPerPage] = useState(Number(ITEMS_PER_PAGE[1].value))

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

	const lastItemsIndex = currentPage * itemsPerPage;
	const firstItemsIndex = lastItemsIndex - itemsPerPage;
	// вырезанные из общего массива элементы для отображения
	const currentPlaces = places.slice(firstItemsIndex, lastItemsIndex)

	// массив со страницами
	const pageNumbers = useMemo(() => {
		const res: number[] = [];

		for (let i = 1; i <= Math.ceil(places.length / itemsPerPage); i++) {
			res.push(i)
		}

		return res;
	}, [places.length, itemsPerPage])

	const handlePageClick = (pageNumber: number) => {
		setCurrentPage(pageNumber)
	}

	const changeCurrentPage = (type: 'prev' | 'next') => {
		if (type === 'prev' && currentPage >= 1) {
			setCurrentPage(currentPage - 1)
		} else {
			setCurrentPage(currentPage + 1)
		}
	}

	const handleDropdownClick = (item: IDropdownItem) => {
		setSelectedItem(item);
		setItemsPerPage(Number(item.name))
	}

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
			<div className={cls.dropdown}>
				<UIDropdown
					items={ITEMS_PER_PAGE}
					selectedItem={selectedItem}
					handleItemClick={handleDropdownClick}
				/>
			</div>

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
				totalPages={pageNumbers.length}
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
