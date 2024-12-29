import {useEffect, useState} from "react";

type UseDevicesType = {
	isMobile: boolean;
	isDesktop: boolean;
}

export const useDevices = (): UseDevicesType => {
	const [ isMobile, setIsMobile ] = useState<boolean>(window.innerWidth < 880)
	const [ isDesktop, setIsDesktop ] = useState<boolean>(window.innerWidth > 880)

	const updateIsMobile = () => {
		setIsMobile(window.innerWidth < 880)
	};

	const updateIsDesktop = () => {
		setIsDesktop(window.innerWidth >= 880)
	};

	useEffect(() => {
		updateIsMobile();
		updateIsDesktop();

		window.addEventListener("resize", updateIsMobile);
		window.addEventListener("resize", updateIsDesktop);

		return () => {
			window.removeEventListener("resize", updateIsMobile);
			window.removeEventListener("resize", updateIsDesktop);
		}
	}, [isMobile, isDesktop])

	return { isMobile, isDesktop };
}