import styles from "./Modal.module.css";
import {ReactNode} from "react";
import {ModalType} from "./type";
import UIIcon from "../icon/UIIcon";
import {IconName} from "../icon/types";

interface IProps {
	type?: ModalType;
	children: ReactNode | null;
	onClose: () => void,
}

const defaultProps: IProps = {
	type: ModalType.Default,
	children: null,
	onClose: () => {}
}

const Modal = (props: IProps = defaultProps) => {
	const modalClasses: string = `${props.type === ModalType.Image ? styles.modalImage : styles.modal}`

	return (
		<div className={styles.overlay}>
			<div className={modalClasses}>
				<div className={styles.closeBtn} onClick={props.onClose}>
					<UIIcon iconName={IconName.Close} />
				</div>
				{props.children}
			</div>
		</div>
	)
}

export default Modal;