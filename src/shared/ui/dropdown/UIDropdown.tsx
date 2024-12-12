import {memo, useCallback, useMemo, useState} from "react";
import cls from './UIDropdown.module.css'
import {IDropdownItem} from "./types";
import {classNames} from "../../lib";
import {UIIcon} from "../icon/UIIcon";
import {IconName} from "../icon/types";

interface IProps {
	className?: string; // внешние классы для позиционирования селекта
	items: Array<IDropdownItem>; // массив элементов для отображения
	selectedItem: IDropdownItem; // выбранный элемент

	disabled?: boolean;
	handleItemClick?: (item: IDropdownItem) => void // обработка клика по элементу дропдауна
}

export const UIDropdown = memo((props: IProps) => {
	const {
		className = '',
		items,
		selectedItem,
		disabled = false,
		handleItemClick,
	} = props;

	const [isDropdownActive, setActiveDropdown] = useState<boolean>(false)

	const itemClasses = (item: IDropdownItem): string => {
		return classNames(cls.item, {
			[cls.itemActive]: selectedItem.value === item.value,
			[cls.itemDisabled]: !item.isAvailable
		}, [])
	}

	const handleClick = (item: IDropdownItem) => {
		handleItemClick(item)
		setActiveDropdown(!isDropdownActive)
	}

	return (
		<div className={classNames(cls.uiDropdown, {}, [className])}>
			<div className={cls.selectedTitle} onClick={() => setActiveDropdown(!isDropdownActive)}>
				{selectedItem.name}

				<UIIcon className={cls.selectedIcon} iconName={IconName.ChevronLeft} />
			</div>

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
		</div>
	)
})