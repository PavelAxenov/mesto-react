import {memo, useMemo} from "react";
import cls from './UIPaginator.module.css'
import {UIIcon} from "../icon/UIIcon";
import {IconName} from "../icon/types";
import {classNames} from "../../lib";

interface IProps {
	className?: string; // внешние классы для позиционирования пагинатора
	pageNumbers: number[]; // массив с номерами страниц
	currentPage: number; // выбранная страница
	pageClick: (page: number) => void; // клик по конкретной странице
	nextPageClick: () => void; // клик для перехода на следующую страницу
	prevPageClick: () => void; // клик для перехода на предыдущую страницу
}

export const UIPaginator = memo((props: IProps) => {
	const {
		className = "",
		pageNumbers,
		currentPage = 1,
		pageClick,
		nextPageClick,
		prevPageClick,
	} = props;

	const lastPageNumber = pageNumbers[pageNumbers.length - 1];
	const totalPages = pageNumbers.length;

	const pageClasses = (page: number): string => {
		return classNames(cls.page, {
			[cls.active]: page === currentPage,
		});
	};

	const arrowClasses = (type: "left" | "right"): string => {
		return classNames(cls.arrow, {
			[cls.arrowDisable]:
			(currentPage === 1 && type === "left") ||
			(currentPage === lastPageNumber && type === "right"),
		});
	};

	const displayedPages = useMemo((): (number | string)[] => {
		const res = [];

		if (currentPage <= 3) {
			res.push(1, 2, 3, 4, "...", totalPages - 1, totalPages);
		} else if (currentPage >= totalPages - 3) {
			res.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
		} else {
			res.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages - 1, totalPages);
		}

		return res;
	}, [currentPage, pageNumbers.length])

	if (totalPages <= 5) {
		return (
			<div className={classNames(cls.uiPaginator, {}, [className])}>
				<div className={arrowClasses("left")} onClick={prevPageClick}>
					<UIIcon iconName={IconName.ChevronLeft} />
				</div>

				<ul className={cls.pageList}>
					{pageNumbers.map((item) => (
						<li
							key={`page-${item}`}
							className={pageClasses(item)}
							onClick={() => pageClick(item)}
						>
							{item}
						</li>
					))}
				</ul>

				<div className={arrowClasses("right")} onClick={nextPageClick}>
					<UIIcon iconName={IconName.ChevronRight} />
				</div>
			</div>
		);
	}

	return (
		<div className={classNames(cls.uiPaginator, {}, [className])}>
			<div className={arrowClasses("left")} onClick={prevPageClick}>
				<UIIcon iconName={IconName.ChevronLeft} />
			</div>

			<ul className={cls.pageList}>
				{displayedPages.map((item, index) => {
					// отображаем троеточие
					if (typeof item === 'string') {
						return (
							<li
								key={`points-${index}`}
								className={cls.points}
							>
								{item}
							</li>
						)
					}
					// отображаем номера страниц
					return (
						<li
							key={`page-${item}`}
							className={pageClasses(item)}
							onClick={() => pageClick(item)}
						>
							{item}
						</li>
					)
				})}
			</ul>

			<div className={arrowClasses("right")} onClick={nextPageClick}>
				<UIIcon iconName={IconName.ChevronRight} />
			</div>
		</div>
	);
});
