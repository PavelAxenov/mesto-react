import { memo, RefObject, useState } from 'react';
import cls from './UserAvatar.module.css'
import { UIImage } from "../../../shared/ui";
import { IUserInfo } from "../../../entities/user";

interface IProps {
	userInfo: IUserInfo;
	onAvatarClick: () => void;
	avatarRef?: RefObject<HTMLDivElement>;
}

export const UserAvatar = memo((props: IProps) => {
	const { userInfo, onAvatarClick, avatarRef } = props;
	const [ isHovered, setIsHovered ] = useState<boolean>(false);

	return (
		<div
			ref={avatarRef}
			className={cls.avatar}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<UIImage
				src={userInfo.avatar}
				alt={userInfo.name}
				className={cls.avatarImg}
				onClick={onAvatarClick}
			/>

			{/*{isHovered &&*/}
			{/*	<button*/}
			{/*		aria-label="Изменить аватар"*/}
			{/*		type="button"*/}
			{/*		className={cls.editBtn}*/}
			{/*		onClick={onAvatarClick}*/}
			{/*	>*/}
			{/*		<UIIcon iconName={IconName.Edit} theme={IconTheme.Light} />*/}
			{/*	</button>*/}
			{/*}*/}
		</div>
	);
})
