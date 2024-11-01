import { useEffect, useState } from 'react'
import "../../index.css";
import Header from '../header/Header';
import Main from '../Main';
import Footer from '../footer/Footer';
import ImagePopup from "../popups/img-popup/ImagePopup";
import api from "../../utils/api/api";
import EditProfilePopup from "../popups/edit-profile/EditProfilePopup";
import EditAvatarPopup from "../popups/edit-avatar/EditAvatarPopup";
import AddPlacePopup from '../popups/add-place/AddPlacePopup';
import { ChangedCard, ChangedUserInfo, ICard, IUserInfo } from "../../utils/api/types";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { CardsContext } from '../../contexts/CardsContext';
import styles from './App.module.css'

export default function App() {
	const [isEditProfilePopupOpen, setProfilePopup] = useState<boolean>(false);
	const [isAddPlacePopupOpen, setNewPlacePopup] = useState<boolean>(false);
	const [isEditAvatarPopupOpen, setAvatarPopup] = useState<boolean>(false);

	const [selectedCard, setSelectedCard] = useState<ICard | null>(null);
	const [cards, setCards] = useState<ICard[]>([]);

	const [currentUser, setCurrentUser] = useState<IUserInfo | null>(null);

	// обновление информации пользователя
	useEffect(() => {
		api
			.getUserInfo()
			.then((dataUser: IUserInfo) => {
				setCurrentUser(dataUser);
			})
			.catch((err) =>
				console.log("Что-то не так с информацией пользователя.", err)
			);
	}, []);

	// обновление аватара пользователя
	useEffect(() => {
		api
			.getCards()
			.then((dataCards) => {
				setCards(dataCards);
			})
			.catch((err) => {
				console.log("Что-то не так с карточками.", err);
			});
	}, []);

	// Попап редактирования профиля
	function handleEditProfileClick() {
		setProfilePopup(true);
	}

	// Попап добавления карточки
	function handleAddPlaceClick() {
		setNewPlacePopup(true);
	}

	// Попап изменения аватара
	function handleEditAvatarClick() {
		setAvatarPopup(true);
	}

	function handleCardClick(cardInfo: ICard) {
		setSelectedCard(cardInfo)
	}

	function closeAllPopups() {
		setProfilePopup(false);
		setNewPlacePopup(false);
		setAvatarPopup(false);
		setSelectedCard(null);
	}

	// Лайки
	function handleCardLike(card: ICard) {
		// Снова проверяем, есть ли уже лайк на этой карточке
		const isLiked: boolean = card.likes.some((i: IUserInfo) => i._id === currentUser._id);

		// Отправляем запрос в API и получаем обновлённые данные карточки
		api.changeLikeCardStatus(card._id, !isLiked)
			.then((newCard: ICard) => {
				setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
			})
			.catch(err => { console.log(err) })
	}

	// Удаление карточек
	function handleCardDelete(card: ICard) {
		api.deleteCard(card._id).then(() => {
			setCards((state: ICard[]) => state.filter((c: ICard) => c._id !== card._id))
		})
			.catch(err => { console.log("Не удаляется карточка", err) });

	}

	// Обновление данных пользователя
	function handleUpdateUser(datas: ChangedUserInfo) {
		api.sendProfileDatasToServer(datas.name, datas.about)
			.then((profileDatas: IUserInfo) => {
				setCurrentUser(profileDatas);
				closeAllPopups();
			})
			.catch(err => { console.log("Что-то не так с отправкой данных на сервер", err) })
	}

	// Обновляет аватар
	function handleUpdateAvatar(avatar: string) {
		api.sendAvatarToServer(avatar)
			.then((user : IUserInfo) => {
				setCurrentUser(user);
				closeAllPopups();
			})
			.catch(err => { console.log("Не обновляется аватар", err) })
	}

	// Добавляет карточку
	function handleAddPlaceSubmit(card: ChangedCard) {
		api.postCard(card)
			.then((newCard: ICard) => {
				setCards([newCard, ...cards]);
				closeAllPopups();
			})
			.catch(err => { console.log("Не добавляется карточка", err) })
	}

	return (
		<div className={styles.app}>
			<CurrentUserContext.Provider value = {currentUser}>
				<div className={styles.page}>
					<Header />

					<CardsContext.Provider value = {cards}>
						<Main
							onEditAvatar={handleEditAvatarClick}
							onEditProfile={handleEditProfileClick}
							onAddPlace={handleAddPlaceClick}
							onCardClick={handleCardClick}
							onCardLike={handleCardLike}
							onCardDelete={handleCardDelete}
						/>
					</CardsContext.Provider>

					<Footer />

					{/*Редактировать профиль*/}
					{isEditProfilePopupOpen &&
						<EditProfilePopup
							isOpen={isEditProfilePopupOpen}
							onClose={closeAllPopups}
							onUpdateUser={handleUpdateUser}
						/>
					}

					{/*Попап обновления аватара*/}
					{isEditAvatarPopupOpen &&
						<EditAvatarPopup
							isOpen={isEditAvatarPopupOpen}
							onClose={closeAllPopups}
							onUpdateAvatar={handleUpdateAvatar}
						/>
					}

					{/*Добавление карточки*/}
					{isAddPlacePopupOpen &&
						<AddPlacePopup
							isOpen={isAddPlacePopupOpen}
							onClose={closeAllPopups}
							onAddPlace={handleAddPlaceSubmit}
						/>
					}

					{selectedCard &&
						<ImagePopup card={selectedCard} onClose={closeAllPopups} />
					}
				</div>
			</CurrentUserContext.Provider>
		</div>
	);
}
