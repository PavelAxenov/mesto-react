import {ICard} from "../../../shared/api/types";
import styles from "./ImagePopup.module.css";
import {memo} from "react";

interface IProps {
	card: ICard,
}

const ImagePopup = (props: IProps) => {
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