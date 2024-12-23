import {memo, useState} from 'react';
import cls from './UserAvatar.module.css'
import {IconName, IconTheme, UIIcon, UIImage} from "../../../shared/ui";
import {IUserInfo} from "../../../entities/user";

interface IProps {
	userInfo: IUserInfo;
	onAvatarClick: () => void;
}

export const UserAvatar = memo((props: IProps) => {
	const { userInfo, onAvatarClick } = props;
	const [ isHovered, setIsHovered ] = useState<boolean>(false);

	return (
		<div
			className={cls.avatar}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<UIImage
				src={userInfo.avatar}
				alt={userInfo.name}
				className={cls.avatarImg}
			/>

			{isHovered &&
				<button
					aria-label="Изменить аватар"
					type="button"
					className={cls.editBtn}
					onClick={onAvatarClick}
				>
					<UIIcon iconName={IconName.Edit} theme={IconTheme.Light} />
				</button>
			}
		</div>
	);
})
