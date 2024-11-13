import styles from "./ConfirmPopup.module.css";
import {ButtonSize} from "../../../shared/ui/button/types";
import UiButton from "../../../shared/ui/button/UIButton";


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
				<UiButton
					text="Удалить"
					size={ButtonSize.Sm}
					onClick={props.onConfirm}
				/>
				<UiButton
					text="Отмена"
					size={ButtonSize.Sm}
					onClick={props.onCancel}
				/>
			</div>
		</div>
	);
};

export default ConfirmPopup;