import styles from "./Modal.module.css";
import {ReactNode} from "react";
import {ModalType} from "./type";

interface IProps {
	type?: ModalType;
	children: ReactNode;
	onClose: () => void,
}

export default function Modal(props: IProps) {
	const modalClasses: string = `${props.type === ModalType.Image ? styles.modalImage : styles.modal}`

	return (
		<div className={styles.overlay}>
			<div className={modalClasses}>
				<div className={styles.closeBtn} onClick={props.onClose}></div>
				{props.children}
			</div>
		</div>
	)
}