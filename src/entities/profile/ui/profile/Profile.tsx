import styles from "./Profile.module.css"

import { useEffect, useState } from "react";
import { createPortal} from "react-dom";

import { changeUserAvatar } from "../../model/services/change-user-avatar/changeUserAvatar";
import { fetchUser } from "../../model/services/fetch-user/fetchUser";
import { ChangedUserInfoType } from "../../model/types/profile";
import { changeUserInfo } from "../../model/services/change-user-info/changeUserInfo";
import { addCard, ChangedCardType, setAddedCard } from "../../../places";

import { ProfileSkeleton } from "../skeleton/ProfileSkeleton";
import { IconName, IconSize, Modal, UIIcon, useAppDispatch, useAppSelector } from "../../../../shared";
import EditAvatarPopup from "../../../../widgets/popups/edit-avatar/EditAvatarPopup";
import EditProfilePopup from "../../../../widgets/popups/edit-profile/EditProfilePopup";
import AddPlacePopup from "../../../../widgets/popups/add-place/AddPlacePopup";
import {getStoreAddedCard, getStoreUserInfo, getStoreUserLoadingStatus} from "../../model/selectors/selectors";

export const Profile = () => {
	const [isEditAvatarPopupOpen, setAvatarPopup] = useState<boolean>(false);
	const [isEditProfilePopupOpen, setProfilePopup] = useState<boolean>(false);
	const [isAddPlacePopupOpen, setNewPlacePopup] = useState<boolean>(false);

	const userInfo = useAppSelector(getStoreUserInfo);
	const userLoadingStatus = useAppSelector(getStoreUserLoadingStatus);

	const addedCard = useAppSelector(getStoreAddedCard)

	const dispatch = useAppDispatch()

	// получение информации пользователя
	useEffect(() => {
		dispatch(fetchUser())
	}, [])

	// обновление аватара пользователя
	const handleUpdateAvatar = (avatar: string) => {
		dispatch(changeUserAvatar(avatar))
		closeAllPopups();
	}

	// Изменение данных пользователя
	const handleUpdateUser = (data: ChangedUserInfoType) => {
		dispatch(changeUserInfo(data))
		closeAllPopups();
	}

	const onEditAvatarClick = () => {
		setAvatarPopup(true);
	}

	const onEditProfileClick = () => {
		setProfilePopup(true);
	}

	const addNewPlaceClick = () => {
		setNewPlacePopup(true);
	}

	// Добавляет карточку
	const handleAddPlaceSubmit = (card: ChangedCardType) => {
		dispatch(addCard(card))
		closeAllPopups();
	}

	useEffect(() => {
		if (addedCard) {
			dispatch(setAddedCard(addedCard))
		}
	}, [addedCard])

	const closeAllPopups = () => {
		setAvatarPopup(false);
		setProfilePopup(false);
		setNewPlacePopup(false);
	}

	if (userLoadingStatus === 'loading') {
		return (
			<ProfileSkeleton />
		)
	}

	return (
		<>
			<section className={styles.profile}>
				<div className={styles.profileContainer}>
					<div className={styles.avatarContainer}>
						<img
							src={userInfo.avatar}
							alt={userInfo.name}
							className={styles.avatar}
						/>

						<button
							aria-label="Изменить аватар"
							type="button"
							className={styles.avatarEditBtn}
							onClick={onEditAvatarClick}
						>
						</button>
					</div>
					<div className={styles.profileInfo}>
						<h1 className={styles.profileName}>{userInfo.name}</h1>

						<button
							aria-label="Изменить"
							type="button"
							className={styles.profileEditBtn}
							onClick={onEditProfileClick}
						>
							<UIIcon iconName={IconName.Edit} size={IconSize.Sm} />
						</button>

						<p className={styles.profileDescription}>{userInfo.about}</p>
					</div>
				</div>

				<button
					aria-label="Добавить"
					type="button"
					className={styles.addBtn}
					onClick={addNewPlaceClick}
				>
					<UIIcon iconName={IconName.Add} size={IconSize.Md} />
				</button>
			</section>

			{/*Попап обновления аватара*/}
			{isEditAvatarPopupOpen && createPortal(
				<Modal onClose={closeAllPopups}>
					<EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} />
				</Modal>,
				document.body
			)}

			{/*Редактировать профиль*/}
			{isEditProfilePopupOpen && createPortal(
				<Modal onClose={closeAllPopups}>
					<EditProfilePopup
						userName={userInfo.name}
						userDescription={userInfo.about}
						onUpdateUser={handleUpdateUser}
					/>
				</Modal>,
				document.body
			)}

			{/*Добавление карточки*/}
			{isAddPlacePopupOpen && createPortal(
				<Modal onClose={closeAllPopups}>
					<AddPlacePopup
						onAddPlace={handleAddPlaceSubmit}
					/>
				</Modal>,
				document.body
			)}
		</>
	)
}