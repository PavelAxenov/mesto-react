import React, {useState} from "react";
import styles from "./PlacesCard.module.css"
import {createPortal} from "react-dom";
import Modal from "../../../shared/ui/modal/Modal";
import {ModalType} from "../../../shared/ui/modal/type";
import {useAppSelector} from "../../../shared/lib/hooks/redux";
import ImagePopup from "../../../widgets/popups/img-popup/ImagePopup";
import ConfirmPopup from "../../../widgets/popups/confirm-popup/ConfirmPopup";
import UIIcon from "../../../shared/ui/icon/UIIcon";
import {IconName, IconSize} from "../../../shared/ui/icon/types";
import {IUserInfo} from "../../profile";
import {ICard} from "../../places";

interface IProps {
	card: ICard,
	onCardLike: (cardId: string, isLiked: boolean) => void,
	onCardDelete: (card: ICard) => void,
}

export const PlaceCard = (props: IProps) => {
	const currentUser = useAppSelector(state => state.user.userInfo)

	// Определяем, являемся ли мы владельцем текущей карточки
	const isOwn: boolean = props.card.owner._id === currentUser._id;

	// Определяем, есть ли у карточки лайк, поставленный текущим пользователем
	const isLiked: boolean = props.card.likes.some((i: IUserInfo) => i._id === currentUser._id);

	const [showImageModal, setShowImageModal] = useState<boolean>(false);
	const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
	const [selectedCard, setSelectedCard] = useState<ICard | null>(null);

	const handleImageClick = () => {
		setSelectedCard(props.card)
		setShowImageModal(true)
	}

	const closeImageModal = () => {
		setSelectedCard(null)
		closeModals()
	}

	const confirmDeleteCard = () => {
		props.onCardDelete(props.card)
		closeModals()
	}

	const handleDeleteClick = () => {
		setShowConfirmModal(true);
	}

	const handleLikeClick = () => {
		props.onCardLike(props.card._id, isLiked);
	}

	const closeModals = () => {
		setShowImageModal(false)
		setShowConfirmModal(false)
	}

	return (
		<>
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

			{showImageModal && createPortal(
				<Modal type={ModalType.Image} onClose={closeImageModal}>
					<ImagePopup card={selectedCard} />
				</Modal>,
				document.body
			)}

			{showConfirmModal && createPortal(
				<Modal onClose={closeModals}>
					<ConfirmPopup
						onConfirm={confirmDeleteCard}
						onCancel={closeModals}
					/>
				</Modal>,
				document.body
			)}
		</>

	);
}
