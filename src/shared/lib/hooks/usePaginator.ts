import { useMemo, useState } from "react";
import { PaginatorChangeType } from "../../ui";

interface IProps {
	items: Array<unknown>,
}

export const usePaginator = (props: IProps) => {
	const { items } = props;

	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage] = useState(3)

	const lastItemsIndex = currentPage * itemsPerPage;
	const firstItemsIndex = lastItemsIndex - itemsPerPage;
	// вырезанные из общего массива элементы
	const currentItems = items.slice(firstItemsIndex, lastItemsIndex)

	const pageNumbers = useMemo(() => {
		const res: number[] = [];

		for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
			res.push(i)
		}

		return res;
	}, [items.length, itemsPerPage])

	const handlePageClick = (pageNumber: number) => {
		setCurrentPage(pageNumber)
	}

	const changeCurrentPage = (type: PaginatorChangeType) => {
		if (type === 'prev' && currentPage >= 1) {
			setCurrentPage(currentPage - 1)
		} else {
			setCurrentPage(currentPage + 1)
		}
	}

	return {
		currentPage,
		currentItems,
		pageNumbers,
		handlePageClick,
		changeCurrentPage
	}
}