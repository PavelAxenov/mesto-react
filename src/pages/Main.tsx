import { Profile } from "../widgets/profile";
import { Places } from "../widgets/places";
import { useEffect } from "react";
import { fetchCards, selectPlaces } from "../entities/places";
import { useAppDispatch, useAppSelector } from "../shared/lib";
import { fetchUser, selectUserInfo } from "../entities/user";

const Main = () => {
	const userInfo = useAppSelector(selectUserInfo);
	const places = useAppSelector(selectPlaces)
	const dispatch = useAppDispatch()

	// получение информации пользователя
	useEffect(() => {
		dispatch(fetchUser())
	}, [])

	// получение карточек
	useEffect(() => {
		dispatch(fetchCards())
	}, [])

	if (!userInfo || !places || !places.length) {
		return (
			<div>Error Page</div>
		)
	}

	return (
		<main>
			<Profile />

			<Places />
		</main>
	);
}

export default Main