import styles from "./ConfirmPopup.module.css";
import {ButtonSize, UIButton} from "../../../shared";


interface IProps {
	onConfirm: () => void
	onCancel: () => void
}

const ConfirmPopup = (props: IProps) => {
	return (
		<div className={styles.confirmContainer}>
			<h3 className={styles.title}>
				Вы действительно хотите удалить?
			</h3>

			<div className={styles.btnWrapper}>
				<UIButton
					text="Удалить"
					size={ButtonSize.Sm}
					onClick={props.onConfirm}
				/>
				<UIButton
					text="Отмена"
					size={ButtonSize.Sm}
					onClick={props.onCancel}
				/>
			</div>
		</div>
	);
};

export default ConfirmPopup;