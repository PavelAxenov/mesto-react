import { useState, useEffect } from 'react';

type UseScrollLockType = {
	isScrollLocked: boolean;
	disableScrollPage: () => void;
	enableScrollPage: () => void;
};

export const useScrollPage = (initialLock = false): UseScrollLockType => {
	const [isScrollLocked, setIsScrollLocked] = useState(initialLock);

	useEffect(() => {
		document.body.style.overflow = isScrollLocked ? 'hidden' : 'auto';
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [isScrollLocked]);

	const disableScrollPage = () => {
		setIsScrollLocked(true);
	};

	const enableScrollPage = () => {
		setIsScrollLocked(false);
	};

	return { isScrollLocked, disableScrollPage, enableScrollPage };
};