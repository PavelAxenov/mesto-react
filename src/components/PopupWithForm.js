import React from "react";

function PopupWithForm({ name, isOpen, title, onSubmit, buttonText, onClose, children }) {
    return (
      <section>
          <div className={`popup popup_type_${name} ${isOpen ? "popup_is-opened" : ""}`}>
          <div className="popup__container">
            <h3 className="popup__title">{title}</h3>
            <form className={`popup__form popup__form_${name}`}
              name={name}
              onSubmit={onSubmit}
            >
              {children}
              <button type="submit" className="popup__submit-button">
                {buttonText}
              </button>
            </form>
            <button
              aria-label="Закрыть"
              type="button"
              className="popup__close-button"
              onClick={onClose}>
            </button>
          </div>
        </div>
      </section>
    );
}

export default PopupWithForm;