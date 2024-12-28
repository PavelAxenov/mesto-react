import cls from "./ImagePopup.module.css";
import {memo} from "react";
import {ICard} from "../../../../entities/places";
import {UIImage} from "../../../../shared/ui";

interface IProps {
	card: ICard,
}
export const ImagePopup = memo((props: IProps) => {
	return (
		<div className={cls.imgContainer}>
			<UIImage
				src={props.card.link}
				alt={props.card.name}
				className={cls.image}
			/>

			<h2 className={cls.imageText}>{props.card.name}</h2>
		</div>
	);
})
