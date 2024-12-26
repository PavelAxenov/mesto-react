import cls from "./Modal.module.css";
import React, {memo, ReactNode, useEffect, useRef} from "react";
import {ModalType} from "../model/types/modal";
import {IconName, IconTheme, UIIcon} from "../../../shared/ui";

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
	const modalRef = useRef<HTMLDivElement | null>(null);

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		//Проверяем, клик произошел внутри модалки или нет
		if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
			props.onClose();
		}
	};

	const keyPress = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			props.onClose();
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', keyPress);
		return () => {
			document.removeEventListener('keydown', keyPress);
		};
	}, [props.onClose]);

	const modalClasses: string = `${props.type === ModalType.Image ? cls.modalImage : cls.modal}`

	return (
		<div className={cls.overlay} onClick={handleClick}>
			<div ref={modalRef} className={modalClasses}>
				<div className={cls.closeBtn} onClick={props.onClose}>
					<UIIcon
						iconName={IconName.Close}
						theme={IconTheme.Light}
					/>
				</div>
				{props.children}
			</div>
		</div>
	)
})
