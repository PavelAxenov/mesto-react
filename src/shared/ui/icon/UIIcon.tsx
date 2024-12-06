import {memo} from "react";
import cls from './UIIcon.module.css'
import {IconName, IconSize} from "./types";

import AddIcon from './icons/add.svg?react';
import CloseIcon from './icons/close.svg?react';
import EditIcon from './icons/edit.svg?react';
import HeartIcon from './icons/heart.svg?react';
import HeartSolidIcon from './icons/heart-solid.svg?react';
import LogoIcon from './icons/logo.svg?react';
import TrashIcon from './icons/trash.svg?react';
import ChevronRight from './icons/chevron-right.svg?react';
import ChevronLeft from './icons/chevron-left.svg?react';

interface IProps {
	size?: IconSize;
	iconName: IconName;
}

export const UIIcon = memo((props: IProps) => {
	const { size = IconSize.Md, iconName } = props;

	const iconClass = `${cls['ui-icon']} ${cls[`ui-icon-${size}`]}`

	switch (iconName) {
		case IconName.Add:
			return <AddIcon className={iconClass} />;
		case IconName.Close:
			return <CloseIcon className={iconClass} />;
		case IconName.Edit:
			return <EditIcon className={iconClass} />;
		case IconName.Heart:
			return <HeartIcon className={iconClass} />;
		case IconName.HeartSolid:
			return <HeartSolidIcon className={iconClass} />;
		case IconName.Logo:
			return <LogoIcon className={iconClass} />;
		case IconName.Trash:
			return <TrashIcon className={iconClass} />;
		case IconName.ChevronRight:
			return <ChevronRight className={iconClass} />;
		case IconName.ChevronLeft:
			return <ChevronLeft className={iconClass} />;
	}
});
