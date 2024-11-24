import styles from "./PlaceCard.module.css"
import { IconName, IconSize, UIIcon } from "../../../shared/ui";
import { useAppSelector } from "../../../shared/lib";
import { ICard } from "../../../entities/places";
import { IUserInfo, selectUserInfo } from "../../../entities/user";

interface IProps {
	card: ICard,
	onCardLike: (cardId: string, isLiked: boolean) => void,
	onCardDelete: (card: ICard) => void,
	onCardClick: (card: ICard) => void,
}

export const PlaceCard = (props: IProps) => {
	const currentUser = useAppSelector(selectUserInfo)

	// Определяем, являемся ли мы владельцем текущей карточки
	const isOwn: boolean = props.card.owner._id === currentUser._id;

	// Определяем, есть ли у карточки лайк, поставленный текущим пользователем
	const isLiked: boolean = props.card.likes.some((i: IUserInfo) => i._id === currentUser._id);

	const handleImageClick = () => {
		props.onCardClick(props.card)
	}

	const handleDeleteClick = () => {
		props.onCardDelete(props.card)
	}

	const handleLikeClick = () => {
		props.onCardLike(props.card._id, isLiked);
	}

	return (
		<li className={styles.placeCard}>
			{isOwn &&
				<button
					type="button"
					className={styles.removeBtn}
					onClick={handleDeleteClick}
				>
					<UIIcon iconName={IconName.Trash} size={IconSize.Sm}/>
				</button>
			}

			<img
				src={props.card.link}
				alt={props.card.name}
				className={styles.placesImg}
				onClick={handleImageClick}
			/>

			<div className={styles.placeInfo}>
				<h2 className={styles.placeTitle}>{props.card.name}</h2>

				<div className={styles.likeContainer}>
					<button
						type="button"
						className={styles.likeBtn}
						onClick={handleLikeClick}
					>
						{isLiked ?
							<UIIcon iconName={IconName.HeartSolid} size={IconSize.Sm}/>
							:
							<UIIcon iconName={IconName.Heart} size={IconSize.Sm} />}
					</button>

					<p className={styles.likeCounter}>{props.card.likes.length}</p>
				</div>
			</div>
		</li>
	);
}
