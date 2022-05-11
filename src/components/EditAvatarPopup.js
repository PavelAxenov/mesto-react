import PopupWithForm from "./PopupWithForm";
import React from "react";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const [avatar, setAvatar] = React.useState('');

    React.useEffect(() => {
        setAvatar('');
    }, [isOpen])

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
          avatar
        });
    }

    function handleAvatarLink(event) {
        setAvatar(event.target.value);
    }

    return (
        <PopupWithForm // Попап обновления аватара
            title="Обновить аватар"
            name="edit-avatar"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
        <label className="popup__form-field">
            <input
                type="url"
                id="popup__input-avatar"
                name="link"
                onChange={handleAvatarLink}
                value={avatar}
                className="popup__input popup__input_type_avatar"
                placeholder="Ссылка на аватар"
                autoComplete="off"                
                required
            />
            <span className="popup__input-error popup__input-avatar-error"></span>
        </label>
      </PopupWithForm>
    );
}