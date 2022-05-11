import React, { useState } from 'react'
import "../index.css";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from "./ImagePopup";
import api from "../utils/Api.js";
import { CurrentUserContext, CardsContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from './AddPlacePopup';

function App() {
    const defaultUser = {
        _id: '',
        about: '',
        avatar: '',
        cohort: '',
        name: '',
    }

    const [isEditProfilePopupOpen, setProfilePopup] = useState(false);
    const [isAddPlacePopupOpen, setNewPlacePopup] = useState(false);
    const [isEditAvatarPopupOpen, setAvatarPopup] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});

    const [currentUser, setCurrentUser] = useState(defaultUser);
    const [cards, setCards] = useState([]);

    React.useEffect(() => {     // обновление информации пользователя
      api
        .getUserInfo()
        .then((dataUser) => {
          setCurrentUser(dataUser);
        })
        .catch((err) =>
          console.log("Что-то не так с информацией пользователя.", err)
        );
    }, []);

    React.useEffect(() => {    // обновление аватара пользователя
      api
        .getCards()
        .then((dataCards) => {
          setCards(dataCards);
        })
        .catch((err) => {
          console.log("Что-то не так с карточками.", err);
        });
    }, []);
    
    
    function handleEditProfileClick() {    // Попап редактирования профиля
        setProfilePopup(true);
    }
    
    function handleAddPlaceClick() {     // Попап добавления карточки
        setNewPlacePopup(true);
    }
    
    function handleEditAvatarClick() {   // Попап изменения аватара
        setAvatarPopup(true);
    }
    
    function handleCardClick(cardInfo) {
        setSelectedCard(cardInfo)
    }

    function closeAllPopups() {
        setProfilePopup(false);
        setNewPlacePopup(false);
        setAvatarPopup(false);
        setSelectedCard({});
    }
    
    // Лайки
    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => { console.log(err) })
    }

    // Удаление карточек
    function handleCardDelete(card) {
        api.deleteCard(card._id).then(() => {
            setCards((state) => state.filter((c) => c._id !== card._id))
        })
        .catch(err => { console.log("Не удаляется карточка", err) });
        
    }
  
    // Обновление данных пользователя
    function handleUpdateUser(datas) {
        api.sendProfileDatasToServer(datas.name, datas.about)
          .then(profileDatas => {
            setCurrentUser(profileDatas);
            closeAllPopups();
          })
          .catch(err => { console.log("Что-то не так с отправкой данных на сервер", err) })
    }

    // Обновляет аватар
    function handleUpdateAvatar({ avatar }) {
        api.sendAvatarToServer(avatar)
        .then(user => {
            setCurrentUser(user);
            closeAllPopups();
        })
        .catch(err => { console.log("Не обновляется аватар", err) })
    }

    // Добавляет карточку
    function handleAddPlaceSubmit(card) {
        api.postCard(card)
        .then(newCard => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        })
        .catch(err => { console.log("Не добавляется карточка", err) })
    }

    return (
        <div className="App">
            <CurrentUserContext.Provider value = {currentUser}>
                <div className="page">
                    <Header />
                    <CardsContext.Provider value = {cards}>
                        <Main
                            onEditAvatar={handleEditAvatarClick}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onCardClick={handleCardClick}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete}
                            onUpdateCards={setCards}
                        />
                    </CardsContext.Provider>
                    
                    <Footer />
                    
                    <EditProfilePopup       //Редактировать профиль
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                    />

                    <EditAvatarPopup         // Попап обновления аватара
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                    />

                    <AddPlacePopup         //Добавление карточки
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}
                    />

                    <PopupWithForm       // Попап подтверждения
                        title="Вы уверены?"
                        name="question">
                    </PopupWithForm>

                    <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                </div>
            </CurrentUserContext.Provider>
            
        </div>
    );
}

export default App;