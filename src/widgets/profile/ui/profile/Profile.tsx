import styles from "./Profile.module.css"

import {useCallback, useEffect, useState} from "react";
import { createPortal} from "react-dom";

import { ProfileSkeleton } from "../skeleton/ProfileSkeleton";
import { useAppDispatch, useAppSelector } from "../../../../shared/lib";
import { IconName, IconSize, UIIcon } from "../../../../shared/ui";
import { Modal } from "../../../../entities/modal";
import { AddPlacePopup, EditAvatarPopup, EditProfilePopup } from "../../../../features/popups";
import {
	ChangedUserInfoType,
	changeUserAvatar,
	changeUserInfo,
	fetchUser,
	selectUserInfo,
	selectUserLoadingStatus
} from "../../../../entities/user";
import { addCard, ChangedCardType, selectAddedCard, setAddedCard } from "../../../../entities/places";

export const Profile = () => {
	const [isEditAvatarPopupOpen, setAvatarPopup] = useState<boolean>(false);
	const [isEditProfilePopupOpen, setProfilePopup] = useState<boolean>(false);
	const [isAddPlacePopupOpen, setNewPlacePopup] = useState<boolean>(false);

	const userInfo = useAppSelector(selectUserInfo);
	const userLoadingStatus = useAppSelector(selectUserLoadingStatus);

	const addedCard = useAppSelector(selectAddedCard)

	const dispatch = useAppDispatch()

	// получение информации пользователя
	useEffect(() => {
		dispatch(fetchUser())
	}, [])

	const closeAllPopups = useCallback(() => {
		setAvatarPopup(false);
		setProfilePopup(false);
		setNewPlacePopup(false);
	}, [])

	// обновление аватара пользователя
	const handleUpdateAvatar = useCallback((avatar: string) => {
		dispatch(changeUserAvatar(avatar))
		closeAllPopups();
	}, [dispatch, closeAllPopups])

	// Изменение данных пользователя
	const handleUpdateUser = useCallback((data: ChangedUserInfoType) => {
		dispatch(changeUserInfo(data))
		closeAllPopups();
	},[dispatch, closeAllPopups])

	const onEditAvatarClick = useCallback(() => {
		setAvatarPopup(true);
	}, [])

	const onEditProfileClick = useCallback(() => {
		setProfilePopup(true);
	}, [])

	const addNewPlaceClick = useCallback(() => {
		setNewPlacePopup(true);
	}, [])

	// Добавляет карточку
	const handleAddPlaceSubmit = useCallback((card: ChangedCardType) => {
		dispatch(addCard(card))
		closeAllPopups();
	}, [dispatch, closeAllPopups])

	useEffect(() => {
		if (addedCard) {
			dispatch(setAddedCard(addedCard))
		}
	}, [addedCard])

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