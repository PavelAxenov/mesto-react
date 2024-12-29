import {memo, ReactNode, RefObject, useEffect, useRef, useState} from 'react';
import {createPortal} from "react-dom";
import cls from './Popover.module.css';
import {classNames, useDevices, useScrollPage} from "../../../shared/lib";

interface IProps {
	targetRef: RefObject<HTMLElement>;
	onClose: () => void;
	className?: string;
	children: ReactNode;
}

export const Popover = memo((props: IProps) => {
	const { targetRef, children, onClose, className = '' } = props;

	const [position, setPosition] = useState({ top: 0, left: 0 });
	const [isOpened, setIsOpened] = useState(false);

	const popoverRef = useRef(null);

	const { disableScrollPage, enableScrollPage } = useScrollPage()

	useEffect(() => {
		if (targetRef.current) {
			calculatePosition();
			document.addEventListener('mousedown', handleClickOutside);
			if (isMobile) disableScrollPage()
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
			if (isMobile) enableScrollPage()
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			if (isMobile) enableScrollPage()
		};
	}, [targetRef]);

	const { isDesktop, isMobile } = useDevices()

	const calculatePosition = () => {
		if (!targetRef.current) return;

		const targetRect = targetRef.current.getBoundingClientRect();
		const popoverElement = popoverRef.current;
		if (!popoverElement) return;
		const popoverRect = popoverElement.getBoundingClientRect();

		// const windowWidth = window.innerWidth;
		const windowWidth = 880; // максимальная ширина контента на странице
		const windowHeight = window.innerHeight;

		let top, left;
		// Проверяем, хватит ли места справа
		if (targetRect.right + popoverRect.width < windowWidth) {
			left = targetRect.right;
		} else {
			left = targetRect.left - popoverRect.width;
		}

		// Проверяем, хватит ли места снизу
		if (targetRect.bottom + popoverRect.height < windowHeight) {
			top = targetRect.bottom;
		} else {
			top = targetRect.top - popoverRect.height;
		}
		setPosition({ top, left });
		setIsOpened(true);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (popoverRef.current && !popoverRef.current.contains(event.target as Node) &&
			targetRef.current && !targetRef.current.contains(event.target as Node)) {
			setIsOpened(false);
			if (isMobile) enableScrollPage()
			onClose();
		}
	};

	return (
		<>
			{isDesktop ?
				createPortal(
				<div
					ref={popoverRef}
					className={classNames(cls.popover, {[cls.hidden]: !isOpened}, [className])}
					style={position}
				>
					{children}
				</div>,
				document.body
			) :
				createPortal(
					<div className={classNames(cls.overlay, {[cls.hidden]: !isOpened}, [className])}>
						<div
							ref={popoverRef}
							className={classNames(cls.popover, {[cls.hidden]: !isOpened}, [className])}
						>
							{children}
						</div>
					</div>,
					document.body
				)
			}
		</>
	)
});
