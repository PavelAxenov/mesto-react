import cls from './UserAvatarPopover.module.css';
import {IUserInfo} from "../../../../entities/user";
import {IconName, IconSize, IconTheme, UIIcon} from "../../../../shared/ui";

interface IProps {
	userInfo: IUserInfo;
	onEditProfileClick?: () => void;
	onEditAvatarClick?: () => void;
}

export const UserAvatarPopover = (props: IProps) => {

	const { userInfo, onEditProfileClick, onEditAvatarClick } = props;

	return (
		<div>
			<div className={cls.profileInfo}>
				<span className={cls.profileName}>{userInfo.name}</span>
				<span className={cls.profileDescription}>{userInfo.about}</span>
			</div>

			{/*TODO: заменить кнопки ниже на ссылки на страницу с профилем и там редактировать*/}
			<button
				type="button"
				className={cls.profileEditBtn}
				onClick={onEditProfileClick}
			>
				<UIIcon
					iconName={IconName.Edit}
					size={IconSize.Xs}
				/>
				<span>Редактировать профиль</span>
			</button>

			<button
				type="button"
				className={cls.profileEditBtn}
				onClick={onEditAvatarClick}
			>
				<UIIcon
					iconName={IconName.Edit}
					size={IconSize.Xs}
				/>
				<span>Редактировать аватар</span>
			</button>
		</div>
	);
};
