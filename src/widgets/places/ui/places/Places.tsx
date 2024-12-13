import cls from "./Places.module.css";
import {useCallback, useEffect, useMemo, useState} from "react";
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
	setCardsByDelete,
	setCardsByLike,
	setDeletedCard,
	setLikedCard
} from "../../../../entities/places";
import { PlaceCard } from "../../../../features/place-card";
import { IDropdownItem, UIDropdown, UIPaginator } from "../../../../shared/ui";
import { ITEMS_PER_PAGE } from "../../model/consts";

export const Places = () => {
	const dispatch = useAppDispatch()

	const places = useAppSelector(selectPlaces)
	const likedCard = useAppSelector(selectLikedCard)
	const deletedCard = useAppSelector(selectDeletedCard)

	const [ showImageModal, setShowImageModal ] = useState<boolean>(false);
	const [ showConfirmModal, setShowConfirmModal ] = useState<boolean>(false);
	const [ selectedCard, setSelectedCard ] = useState<ICard | null>(null);
	const [ deletingCard, setDeletingCard ] = useState<ICard | null>(null);

	const [currentPage, setCurrentPage] = useState<number>(1)

	const [ selectedDropdownItem, setSelectedDropdownItem ] = useState<IDropdownItem>(ITEMS_PER_PAGE[0])
	const [ itemsPerPage, setItemsPerPage ] = useState<number>(Number(ITEMS_PER_PAGE[0].value))

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

	const closeModals = useCallback(() => {
		setShowImageModal(false);
		setShowConfirmModal(false);
	}, []);

	// открываем окно подтверждения удаления карточки
	const handleDeleteClick = useCallback((card: ICard) => {
		setShowConfirmModal(true);
		setDeletingCard(card);
	}, []);

	// удаляем карточку
	const handleDeleteCard = useCallback(() => {
		dispatch(deleteCard(deletingCard!));
		closeModals();
	}, [dispatch, closeModals]);

	// лайкаем/дизлайкаем карточку
	const handleCardLike = useCallback((cardId: string, isLiked: boolean) => {
		dispatch(changeLikeCardStatus({ cardId, isLiked }));
	}, [dispatch]);

	const handleImageClick = useCallback((card: ICard) => {
		setSelectedCard(card);
		setShowImageModal(true);
	}, []);

	const closeImageModal = useCallback(() => {
		setSelectedCard(null);
		closeModals();
	}, [closeModals]);

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
		setSelectedDropdownItem(item);
		setItemsPerPage(Number(item.name))
	}

	return (
		<section className={cls.places}>
			<div className={cls.dropdown}>
				<UIDropdown
					items={ITEMS_PER_PAGE}
					selectedItem={selectedDropdownItem}
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
