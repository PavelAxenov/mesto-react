import cls from "./Profile.module.css"

import { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { useAppDispatch, useAppSelector } from "../../../../shared/lib";
import { ModalWrapper } from "../../../../entities/modal";
import { EditAvatarPopup, EditProfilePopup } from "../../../../features/popups";
import { ChangedUserInfoType, changeUserAvatar, changeUserInfo, selectUserInfo } from "../../../../entities/user";
import { UserAvatar } from "../../../../features/user-avatar";
import { Popover } from "../../../../entities/popover";
import { UserAvatarPopover } from "../../../../features/popovers";

export const Profile = () => {
	const userAvatarRef = useRef(null);
	const [isPopoverOpened, setIsPopoverOpened] = useState(false)

	const [isEditAvatarPopupOpen, setAvatarPopup] = useState<boolean>(false);
	const [isEditProfilePopupOpen, setProfilePopup] = useState<boolean>(false);

	const userInfo = useAppSelector(selectUserInfo);

	const dispatch = useAppDispatch()

	const closeAllPopups = useCallback(() => {
		setAvatarPopup(false);
		setProfilePopup(false);
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
		setIsPopoverOpened(false)
		setAvatarPopup(true);
	}, [])

	const onEditProfileClick = useCallback(() => {
		setIsPopoverOpened(false)
		setProfilePopup(true);
	}, [])

	return (
		<>
			<section className={cls.profile}>
				<UserAvatar
					avatarRef={userAvatarRef}
					userInfo={userInfo}
					onAvatarClick={() => setIsPopoverOpened(!isPopoverOpened)}
				/>
				{isPopoverOpened &&
					<Popover
						targetRef={userAvatarRef}
						onClose={() => setIsPopoverOpened(false)}
					>
						<UserAvatarPopover
							userInfo={userInfo}
							onEditProfileClick={onEditProfileClick}
							onEditAvatarClick={onEditAvatarClick}
						/>
					</Popover>
				}
			</section>

			{/*Попап обновления аватара*/}
			{isEditAvatarPopupOpen && createPortal(
				<ModalWrapper onClose={closeAllPopups}>
					<EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} />
				</ModalWrapper>,
				document.body
			)}

			{/*Редактировать профиль*/}
			{isEditProfilePopupOpen && createPortal(
				<ModalWrapper onClose={closeAllPopups}>
					<EditProfilePopup
						userName={userInfo.name}
						userDescription={userInfo.about}
						onUpdateUser={handleUpdateUser}
					/>
				</ModalWrapper>,
				document.body
			)}
		</>
	)
}