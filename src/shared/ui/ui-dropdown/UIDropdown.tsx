import React, {memo, useEffect, useRef, useState} from "react";
import cls from './UIDropdown.module.css'
import {IDropdownItem} from "./types";
import {classNames} from "../../lib";
import {UIIcon} from "../ui-icon/UIIcon";
import {IconName, IconTheme} from "../ui-icon/types";

interface IProps {
	className?: string; // внешние классы для позиционирования селекта
	items: Array<IDropdownItem>; // массив элементов для отображения
	selectedItem: IDropdownItem; // выбранный элемент

	disabled?: boolean; // кликнуть на раскрытие дропдауна будет невозможно
	handleItemClick: (item: IDropdownItem) => void // обработка клика по элементу дропдауна
}

export const UIDropdown = memo((props: IProps) => {
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	const {
		className = '',
		items,
		selectedItem,
		disabled = false,
		handleItemClick,
	} = props;

	// переключение раскрытия/скрытия выпадающего списка
	const [isDropdownActive, setActiveDropdown] = useState<boolean>(false)

	// классы для элемента выпадающего списка
	const itemClasses = (item: IDropdownItem): string => {
		return classNames(cls.item, {
			[cls.itemActive]: selectedItem.value === item.value,
			[cls.itemDisabled]: !item.isAvailable
		}, [])
	}

	// клик по элементу в выпадающем списке
	const handleClick = (item: IDropdownItem) => {
		handleItemClick(item)
		setActiveDropdown(!isDropdownActive)
	}

	// обработка клика по раскрывающемуся элементу дропдауна
	const handleTitleClick = () => {
		setActiveDropdown(!isDropdownActive)
	}

	const handleClickOutside = (event: MouseEvent) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
			if (isDropdownActive) {
				handleTitleClick();
			}
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isDropdownActive])

	return (
		<div ref={dropdownRef} className={classNames(cls.uiDropdown, {}, [className])}>
			<div
				className={classNames(cls.selectedTitle, {[cls.uiDropdownDisabled]: disabled})}
				onClick={handleTitleClick}
			>
				{selectedItem.name}

				<UIIcon
					className={classNames(cls.selectedIcon, {[cls.selectedIconActive]: isDropdownActive})}
					iconName={IconName.ChevronLeft}
					theme={IconTheme.Light}
				/>
			</div>

			{!disabled &&
				<ul className={classNames(cls.list, {[cls.show]: isDropdownActive})}>
					{items.map((item: IDropdownItem) => (
						<li
							key={item.value}
							className={itemClasses(item)}
							onClick={() => handleClick(item)}
						>
							{item.name}
						</li>
					))}
				</ul>
			}
		</div>
	)
})