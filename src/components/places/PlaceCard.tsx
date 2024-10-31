import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import {ICard, IUserInfo} from "../../utils/api/types";
import styles from "./PlacesCard.module.css"

interface IProps {
	card: ICard,
	onCardClick: (card: ICard) => void,
	onCardLike: (card: ICard) => void,
	onCardDelete: (card: ICard) => void,
}

export default function PlaceCard(props: IProps) {
	const currentUser = useContext(CurrentUserContext);

	// Определяем, являемся ли мы владельцем текущей карточки
	const isOwn: boolean = props.card.owner._id === currentUser._id;

	// Определяем, есть ли у карточки лайк, поставленный текущим пользователем
	const isLiked: boolean = props.card.likes.some((i: IUserInfo) => i._id === currentUser._id);

	// Создаём переменную, которую после зададим в `className` для кнопки лайка
	const cardLikeButtonClassName: string = (`${styles['places__like-button']} ${isLiked && styles['places__like-button_active']}`);

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
		<li className={styles.places__card}>
			{isOwn && <button type="button" className={styles['remove-button']} onClick={handleDeleteClick}></button>}

			<img
				src={props.card.link}
				alt={props.card.name}
				className={styles.places__image}
				onClick={handleClick}
			/>

			<div className={styles['places__text-wrap']}>
				<h2 className={styles.places__text}>{props.card.name}</h2>
				<div className={styles['places__like-container']}>
					<button
						type="button"
						className={cardLikeButtonClassName}
						onClick={handleLikeClick}
					></button>

					<p className={styles['places__like-counter']}>{props.card.likes.length}</p>
				</div>
			</div>
		</li>
	);
}
