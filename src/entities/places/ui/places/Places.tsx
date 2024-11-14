import styles from "./Places.module.css"
import {useEffect} from "react";
import {
	setCardsByDelete,
	setCardsByLike,
	setDeletedCard,
	setLikedCard
} from "../../model/slice/CardsSlice";
import {useAppDispatch, useAppSelector} from "../../../../shared/lib/hooks/redux";
import {fetchCards} from "../../model/services/fetchCards";
import {ICard} from "../../model/types/places";
import {deleteCard} from "../../model/services/deleteCard";
import {changeLikeCardStatus} from "../../model/services/changeLikeCardStatus";
import {CardSkeleton} from "../skeleton/CardSkeleton";
import {PlaceCard} from "../../../places-card";

export const Places = () => {
	const dispatch = useAppDispatch()
	const { places, placesLoadingStatus, likedCard, deletedCard } = useAppSelector(state => state.cards)
	const currentUser = useAppSelector(state => state.user.userInfo)

	// получение карточек
	useEffect(() => {
		dispatch(fetchCards())
	}, [])

	// удаляем карточку
	const handleDeleteCard = (card: ICard) => {
		dispatch(deleteCard(card))
	}

	// меняем массив карточек когда произошло удаление карточки
	useEffect(() => {
		if (deletedCard) {
			dispatch(setCardsByDelete(deletedCard._id));
			dispatch(setDeletedCard(null));
		}
	}, [deletedCard])

	// лайкаем/дизлайкаем карточку
	const handleCardLike = (cardId: string, isLiked: boolean) => {
		dispatch(changeLikeCardStatus({cardId, isLiked}))
	}

	// меняем массив карточек когда произошел лайк/дизлайк
	useEffect(() => {
		if (likedCard) {
			dispatch(setCardsByLike(likedCard));
			dispatch(setLikedCard(null));
		}
	}, [likedCard])

	if (placesLoadingStatus === 'loading' && !currentUser) {
		return (
			<div className={styles.cards}>
				<CardSkeleton />
			</div>
		)
	}

	if (!places || !places.length) {
		return (
			<div>
				Карточек нет
			</div>
		)
	}

	return (
		<section className={styles.places}>
			<ul className={styles.cards}>
				{places.length && places.map((card: ICard) => (
					<PlaceCard
						key={card._id}
						card={card}
						onCardLike={handleCardLike}
						onCardDelete={handleDeleteCard}
					/>)
				)}
			</ul>
		</section>
	)
}
