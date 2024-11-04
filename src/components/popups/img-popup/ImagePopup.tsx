import {ICard} from "../../../utils/api/types";
import styles from "./ImagePopup.module.css";

interface IProps {
	card: ICard,
}

export default function ImagePopup(props: IProps) {
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