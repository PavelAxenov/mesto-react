import { memo, useMemo } from "react";
import cls from './UIPaginator.module.css'
import { UIIcon } from "../icon/UIIcon";
import { IconName } from "../icon/types";
import { classNames } from "../../lib";

interface IProps {
	className?: string; // внешние классы для позиционирования пагинатора
	totalPages: number; // кол-во страниц
	currentPage: number; // выбранная страница
	pageClick: (page: number) => void; // клик по конкретной странице
	nextPageClick: () => void; // клик для перехода на следующую страницу
	prevPageClick: () => void; // клик для перехода на предыдущую страницу
}

export const UIPaginator = memo((props: IProps) => {
	const {
		className = "",
		currentPage,
		totalPages,
		pageClick,
		nextPageClick,
		prevPageClick,
	} = props;

	const pageClasses = (page: number): string => {
		return classNames(cls.page, {
			[cls.active]: page === currentPage,
		});
	};

	const arrowClasses = (arrowDirection: "left" | "right"): string => {
		return classNames(cls.arrow, {
			[cls.arrowDisable]:
			(currentPage === 1 && arrowDirection === "left") ||
			(currentPage === totalPages && arrowDirection === "right"),
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
	}, [currentPage, totalPages])

	if (totalPages <= 5) {
		return (
			<div className={classNames(cls.uiPaginator, {}, [className])}>
				<div className={arrowClasses("left")} onClick={prevPageClick}>
					<UIIcon iconName={IconName.ChevronLeft} />
				</div>

				<ul className={cls.pageList}>
					{Array.from(Array(totalPages), (_, i) => i + 1).map((item) => (
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
