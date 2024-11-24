import styles from "./Modal.module.css";
import {memo, ReactNode} from "react";
import {ModalType} from "../model/types/modal";
import {IconName, UIIcon} from "../../../shared/ui";

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

export const Modal = memo((props: IProps = defaultProps) => {
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
})
