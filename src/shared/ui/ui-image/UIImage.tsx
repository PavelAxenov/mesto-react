import {memo, useMemo, useState} from 'react';
import { UIIcon } from "../ui-icon/UIIcon";
import { IconName } from "../ui-icon/types";
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
		return classNames(cls.uiImage, {}, [className])
	}, [className])

	const handleImgLoadingStatus = () => {
		setIsLoading(false)
		setIsError(false)
		if (onLoad) {
			onLoad()
		}
	}
	const handleImgErrorStatus = () => {
		setIsLoading(false)
		setIsError(true)
		if (onError) {
			onError()
		}
	}

	return (
		<>
			{
				isLoading &&
				<div style={{color: "#000"}}>loading...</div>
			}
			{
				isError && !isLoading &&
				<UIIcon iconName={IconName.PhotoPlug} className={cls.plugIcon} />
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
