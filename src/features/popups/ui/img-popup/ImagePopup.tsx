import styles from "./ImagePopup.module.css";
import {memo} from "react";
import {ICard} from "../../../../entities/places";

interface IProps {
	card: ICard,
}
export const ImagePopup = memo((props: IProps) => {
	return (
		<div className={styles.imgContainer}>
			<img
				src={props.card.link}
				alt={props.card.name}
				className={styles.image}
			/>

			<h2 className={styles.imageText}>{props.card.name}</h2>
		</div>
	);
})
