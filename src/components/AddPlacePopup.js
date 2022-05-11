import PopupWithForm from "./PopupWithForm";
import React from "react";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');    

    function handleSubmit(event) {
        event.preventDefault();

        onAddPlace({
            name,
            link,
        })
    }

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);


    function handleChange(event) {
        const target = event.target;
        const value = target.value;
        target.name === 'name' ? setName(value) : setLink(value);
    }

    return (
        <PopupWithForm    //Добавление карточки
            title="Новое место"
            name="add-card"
            buttonText="Добавить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            >
                
            <label className="popup__form-field">
            <input
                type="text"
                id="popup__input-card-name"
                name="name"
                className="popup__input popup__input_type_card-name"
                autoComplete="off"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                onChange={handleChange}
                value={name}
                required
            />

            <span className="popup__input-error popup__input-card-name-error"></span>
            </label>
            
            <label className="popup__form-field">
            <input
                type="url"
                id="popup__input-card-source"
                name="link"
                className="popup__input popup__input_type_card-source"
                placeholder="Ссылка на картинку"
                autoComplete="off"
                onChange={handleChange}
                value={link}
                required
            />

            <span className="popup__input-error popup__input-card-source-error"></span>
            </label>           
        </PopupWithForm>
    );
}
