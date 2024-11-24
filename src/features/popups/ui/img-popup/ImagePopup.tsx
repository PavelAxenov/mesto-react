import styles from "./ImagePopup.module.css";
import {memo} from "react";
import {ICard} from "../../../../widgets/places";

interface IProps {
	card: ICard,
}
export const ImagePopup = (props: IProps) => {
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
}

export default memo(ImagePopup);