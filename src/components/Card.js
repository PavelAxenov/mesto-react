import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
	const { name, link } = card;
	const currentUser = useContext(CurrentUserContext);

	const isOwn = card.owner._id === currentUser._id;   // Определяем, являемся ли мы владельцем текущей карточки
	const isLiked = card.likes.some(i => i._id === currentUser._id);  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
	const cardLikeButtonClassName = (`places__like-button ${isLiked && 'places__like-button_active'}`);      // Создаём переменную, которую после зададим в `className` для кнопки лайка

	function handleClick() {
		onCardClick(card);
	}

	function handleLikeClick() {
		onCardLike(card);
	}

	function handleDeleteClick() {
		onCardDelete(card);
	}

	return (
		<li className="places__card">
			{isOwn && <button type="button" className="places__remove-button" onClick={handleDeleteClick}></button>}
			<img
				src={link}
				alt={name}
				className="places__image"
				onClick={handleClick}
			/>
			<div className="places__text-wrap">
				<h2 className="places__text">{name}</h2>
				<div className="places__like-container">
					<button type="button" className={`places__like-button ${cardLikeButtonClassName}`} onClick={handleLikeClick}></button>
					<p className="places__like-counter">{card.likes.length}</p>
				</div>
			</div>
		</li>
	);
}

export default Card;