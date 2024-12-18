import {memo, useCallback, useMemo, useState} from 'react';
import { UIIcon } from "../ui-icon/UIIcon";
import {IconName, IconTheme} from "../ui-icon/types";
import cls from './UIImage.module.css'
import { classNames } from "../../lib";

interface IProps {
	src: string;
	alt: string;
	className?: string;
	onLoad?: () => void;
	onError?: () => void;
	onClick?: () => void;
}

export const UIImage = memo((props: IProps) => {
	const { src, alt, onLoad, onError, onClick, className = '' } = props;

	const [isError, setIsError] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const imgClasses: string = useMemo(() => {
		return classNames(cls.uiImage, {[cls.imgHidden]: isLoading || isError}, [className])
	}, [className, isLoading, isError])

	const handleImgLoadingStatus = useCallback(() => {
		setIsLoading(false)
		setIsError(false)
		if (onLoad) {
			onLoad()
		}
	}, [])
	const handleImgErrorStatus = useCallback(() => {
		setIsLoading(false)
		setIsError(true)
		if (onError) {
			onError()
		}
	}, [])

	return (
		<>
			{
				isLoading &&
				<div className={cls.imgLoader}></div>
			}
			{
				isError && !isLoading &&
				<UIIcon
					className={cls.plugIcon}
					iconName={IconName.PhotoPlug}
					theme={IconTheme.Secondary}
				/>
			}
			{
				!isError &&
				<img
					className={imgClasses}
					src={src}
					alt={alt}
					loading="lazy"
					onLoad={handleImgLoadingStatus}
					onError={handleImgErrorStatus}
					onClick={onClick}
				/>
			}
		</>
	);
});
