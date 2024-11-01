import {ICard} from "../../../utils/api/types";
import styles from "./ImagePopup.module.css";
interface IProps {
	card: ICard,
	onClose: () => void,
}

export default function ImagePopup(props: IProps) {
	return (
		<div className={`${styles.popup} ${styles['popup-image']}}`}>
			<div className={styles['popup-image__container']}>
				<img
					src={props.card.link}
					alt={props.card.name}
					className={styles['popup-image__img']}
				/>

				<h2 className={styles['popup-image__text']}>{props.card.name}</h2>

				<button
					aria-label="Закрыть"
					onClick={props.onClose}
					type="button"
					className={styles['popup__close-button']}>
				</button>
			</div>
		</div>
	);
}