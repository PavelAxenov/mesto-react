import styles from "./ConfirmPopup.module.css";


interface IProps {
	onConfirm: () => void
	onCancel: () => void
}

const ConfirmPopup = (props: IProps) => {
	return (
		<div className={styles.confirmContainer}>
			<h3 className={styles.title}>Вы действительно хотите удалить?</h3>

			<div className={styles.btnWrapper}>
				<button
					className={styles.btn}
					onClick={props.onConfirm}
				>
					Удалить
				</button>

				<button
					className={styles.btn}
					onClick={props.onCancel}
				>
					Отмена
				</button>
			</div>
		</div>
	);
};

export default ConfirmPopup;