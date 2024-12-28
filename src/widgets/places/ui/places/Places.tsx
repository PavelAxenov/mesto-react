import cls from "./Places.module.css";
import {useCallback, useEffect, useMemo, useState} from "react";
import { createPortal } from "react-dom";
import { ModalWrapper, ModalType } from "../../../../entities/modal";
import {AddPlacePopup, ConfirmPopup, ImagePopup} from "../../../../features/popups";
import { classNames, useAppDispatch, useAppSelector } from "../../../../shared/lib";
import {
	addCard,
	ChangedCardType,
	changeLikeCardStatus,
	deleteCard,
	ICard, selectAddedCard,
	selectDeletedCard,
	selectLikedCard,
	selectPlaces, setAddedCard,
	setCardsByDelete,
	setCardsByLike,
	setDeletedCard,
	setLikedCard
} from "../../../../entities/places";
import { PlaceCard } from "../../../../features/place-card";
import {IconName, IconSize, IconTheme, IDropdownItem, UIDropdown, UIIcon, UIPaginator} from "../../../../shared/ui";
import { ITEMS_PER_PAGE } from "../../model/consts";

export const Places = () => {
	const dispatch = useAppDispatch()

	const places = useAppSelector(selectPlaces)
	const likedCard = useAppSelector(selectLikedCard)
	const deletedCard = useAppSelector(selectDeletedCard)
	const addedCard = useAppSelector(selectAddedCard)

	const [ showImageModal, setShowImageModal ] = useState<boolean>(false);
	const [ showConfirmModal, setShowConfirmModal ] = useState<boolean>(false);
	const [ selectedCard, setSelectedCard ] = useState<ICard | null>(null);
	const [ deletingCard, setDeletingCard ] = useState<ICard | null>(null);
	const [ isAddPlacePopupOpen, setNewPlacePopup ] = useState<boolean>(false);

	const [ currentPage, setCurrentPage ] = useState<number>(1)

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

	useEffect(() => {
		if (addedCard) {
			dispatch(setAddedCard(addedCard))
		}
	}, [addedCard])

	const closeModals = useCallback(() => {
		setShowImageModal(false);
		setShowConfirmModal(false);
		setNewPlacePopup(false);
	}, []);

	// открываем окно подтверждения удаления карточки
	const handleDeleteClick = useCallback((card: ICard) => {
		setDeletingCard(card);
		setShowConfirmModal(true);
	}, []);

	// удаляем карточку
	const handleDeleteCard = useCallback(() => {
		if (deletingCard) {
			dispatch(deleteCard(deletingCard));
		}
		closeModals();
	}, [dispatch, closeModals, deletingCard]);

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

	const addNewPlaceClick = useCallback(() => {
		setNewPlacePopup(true);
	}, [])

	// Добавляет карточку
	const handleAddPlaceSubmit = useCallback((card: ChangedCardType) => {
		dispatch(addCard(card))
		closeModals();
	}, [dispatch, closeModals])

	return (
		<section className={cls.places}>
			<div className={cls.cardsControls}>
				<button
					aria-label="Добавить фото"
					type="button"
					className={cls.addBtn}
					onClick={addNewPlaceClick}
				>
					<UIIcon
						iconName={IconName.AddPhoto}
						size={IconSize.Md}
						theme={IconTheme.Light}
					/>
				</button>

				<div className={cls.dropdownWrapper}>
					<span className={cls.dropdownTitle}>Кол-во карточек на странице:&nbsp;</span>
					<UIDropdown
						className={cls.dropdown}
						items={ITEMS_PER_PAGE}
						selectedItem={selectedDropdownItem}
						handleItemClick={handleDropdownClick}
					/>
				</div>
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
				<ModalWrapper type={ModalType.Image} onClose={closeImageModal}>
					<ImagePopup card={selectedCard} />
				</ModalWrapper>,
				document.body
			)}

			{showConfirmModal && createPortal(
				<ModalWrapper onClose={closeModals}>
					<ConfirmPopup
						onConfirm={handleDeleteCard}
						onCancel={closeModals}
					/>
				</ModalWrapper>,
				document.body
			)}

			{/*Добавление карточки*/}
			{isAddPlacePopupOpen && createPortal(
				<ModalWrapper onClose={closeModals}>
					<AddPlacePopup
						onAddPlace={handleAddPlaceSubmit}
					/>
				</ModalWrapper>,
				document.body
			)}
		</section>
	)
}
