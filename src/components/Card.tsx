import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { ICard } from "../utils/api/types";

interface IProps {
	card: ICard,
	onCardClick: (card: ICard) => void,
	onCardLike: (card: ICard) => void,
	onCardDelete: (card: ICard) => void,
}

export default function Card(props: IProps) {
	const currentUser = useContext(CurrentUserContext);

	// Определяем, являемся ли мы владельцем текущей карточки
	const isOwn = props.card.owner._id === currentUser._id;

	// Определяем, есть ли у карточки лайк, поставленный текущим пользователем
	const isLiked = props.card.likes.some(i => i._id === currentUser._id);

	// Создаём переменную, которую после зададим в `className` для кнопки лайка
	const cardLikeButtonClassName = (`places__like-button ${isLiked && 'places__like-button_active'}`);

	function handleClick() {
		props.onCardClick(props.card);
	}

	function handleLikeClick() {
		props.onCardLike(props.card);
	}

	function handleDeleteClick() {
		props.onCardDelete(props.card);
	}

	return (
		<li className="places__card">
			{isOwn && <button type="button" className="places__remove-button" onClick={handleDeleteClick}></button>}

			<img
				src={props.card.link}
				alt={props.card.name}
				className="places__image"
				onClick={handleClick}
			/>

			<div className="places__text-wrap">
				<h2 className="places__text">{props.card.name}</h2>
				<div className="places__like-container">
					<button type="button" className={`places__like-button ${cardLikeButtonClassName}`} onClick={handleLikeClick}></button>
					<p className="places__like-counter">{props.card.likes.length}</p>
				</div>
			</div>
		</li>
	);
}
