import { memo, useMemo } from "react";
import cls from './UIIcon.module.css'
import {IconName, IconSize, IconTheme} from "./types";
import { classNames } from "../../lib";

import AddIcon from './icons/add.svg?react';
import AddPhotoIcon from './icons/add-photo.svg?react';
import CloseIcon from './icons/close.svg?react';
import EditIcon from './icons/edit.svg?react';
import HeartIcon from './icons/heart.svg?react';
import HeartSolidIcon from './icons/heart-solid.svg?react';
import LogoIcon from './icons/logo.svg?react';
import TrashIcon from './icons/trash.svg?react';
import ChevronRight from './icons/chevron-right.svg?react';
import ChevronLeft from './icons/chevron-left.svg?react';
import PhotoPlug from './icons/photo-plug.svg?react';

interface IProps {
	iconName: IconName; // имя иконки из уже имеющихся
	size?: IconSize; // размер иконки
	theme?: IconTheme; // тема иконки
	className?: string // внешние классы для иконки
}

export const UIIcon = memo((props: IProps) => {
	const { iconName, size = IconSize.Md, theme = IconTheme.Default,  className = '' } = props;

	const iconClass = useMemo(() => {
		const mods: Record<string, string> = {
			size: cls[`ui-icon-${size}`],
			theme: cls[`ui-icon-${theme}`],
		}
		return classNames(cls['ui-icon'], mods, [className])
	}, [size, theme, className])

	switch (iconName) {
		case IconName.Add:
			return <AddIcon className={iconClass} />;
		case IconName.AddPhoto:
			return <AddPhotoIcon className={iconClass} />;
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
		case IconName.PhotoPlug:
			return <PhotoPlug className={iconClass} />;
	}
});
