import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import React from "react";

export default function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }
    
    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
      <PopupWithForm //Редактировать профиль
            title="Редактировать профиль"
            name="edit"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >

        <label className="popup__form-field">
            <input
                type="text"
                id="popup__input-name"
                name="name"
                className="popup__input popup__input_type_name"
                placeholder="Имя"
                value={name}
                onChange={handleNameChange}
                minLength="2"
                maxLength="40"
                autoComplete="off"
                required
            />
            <span className="popup__input-error popup__input-name-error"></span>
        </label>

        <label className="popup__form-field">
            <input
                type="text"
                id="popup__input-profession"
                name="about"
                className="popup__input popup__input_type_profession"
                placeholder="Профессия"
                value={description}
                onChange={handleDescriptionChange}
                minLength="2"
                maxLength="400"
                autoComplete="off"
                required
            />
            <span className="popup__input-error popup__input-profession-error"></span>
        </label>
      </PopupWithForm>
    );
}