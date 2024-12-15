import cls from "./Profile.module.css"

import {useCallback, useEffect, useState} from "react";
import { createPortal} from "react-dom";

import { useAppDispatch, useAppSelector } from "../../../../shared/lib";
import { IconName, IconSize, UIIcon } from "../../../../shared/ui";
import { Modal } from "../../../../entities/modal";
import { AddPlacePopup, EditAvatarPopup, EditProfilePopup } from "../../../../features/popups";
import { ChangedUserInfoType, changeUserAvatar, changeUserInfo, selectUserInfo } from "../../../../entities/user";
import { addCard, ChangedCardType, selectAddedCard, setAddedCard } from "../../../../entities/places";

export const Profile = () => {
	const [isEditAvatarPopupOpen, setAvatarPopup] = useState<boolean>(false);
	const [isEditProfilePopupOpen, setProfilePopup] = useState<boolean>(false);
	const [isAddPlacePopupOpen, setNewPlacePopup] = useState<boolean>(false);

	const userInfo = useAppSelector(selectUserInfo);
	const addedCard = useAppSelector(selectAddedCard)

	const dispatch = useAppDispatch()

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

	return (
		<>
			<section className={cls.profile}>
				<div className={cls.profileContainer}>
					<div className={cls.avatarContainer}>
						<img
							src={userInfo.avatar}
							alt={userInfo.name}
							className={cls.avatar}
						/>

						<button
							aria-label="Изменить аватар"
							type="button"
							className={cls.avatarEditBtn}
							onClick={onEditAvatarClick}
						>
						</button>
					</div>

					<div className={cls.profileInfo}>
						<h1 className={cls.profileName}>{userInfo.name}</h1>

						<button
							aria-label="Изменить"
							type="button"
							className={cls.profileEditBtn}
							onClick={onEditProfileClick}
						>
							<UIIcon iconName={IconName.Edit} size={IconSize.Sm} />
						</button>

						<p className={cls.profileDescription}>{userInfo.about}</p>
					</div>
				</div>

				<button
					aria-label="Добавить"
					type="button"
					className={cls.addBtn}
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