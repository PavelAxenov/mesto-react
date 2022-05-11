import React from "react";
import Card from "./Card";
import { CurrentUserContext, CardsContext } from "../contexts/CurrentUserContext";


function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const cards = React.useContext(CardsContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__container">
                    <div className="profile__avatar-container">
                        <img
                            src={currentUser.avatar}
                            alt={currentUser.name}
                            className="profile__avatar"/>
                        <button
                            aria-label="Изменить аватар"
                            type="button"
                            className="profile__avatar-button"
                            onClick={props.onEditAvatar}>
                        </button>
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button
                            aria-label="Изменить"
                            type="button"
                            className="profile__eddit-button"
                            onClick={props.onEditProfile}>
                        </button>
                        <p className="profile__description">{currentUser.about}</p>
                    </div>
                </div>
                <button
                    aria-label="Добавить"
                    type="button"
                    className="profile__add-button"
                    onClick={props.onAddPlace}>
                </button>
            </section>

            <section className="places">
                <ul className="places__cards">
                    {cards.map((card) => (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={props.onCardClick}
                            onCardLike={props.onCardLike}
                            onCardDelete={props.onCardDelete}
                        />)
                    )}
                </ul>
            </section>
        </main>
    );
}

export default Main;