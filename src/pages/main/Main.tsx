import { Profile, ProfileSkeleton } from "../../widgets/profile";
import { CardSkeleton, Places } from "../../widgets/places";
import { useEffect } from "react";
import { fetchCards, selectPlaces, selectPlacesLoadingStatus } from "../../entities/places";
import { useAppDispatch, useAppSelector } from "../../shared/lib";
import { fetchUser, selectUserLoadingStatus } from "../../entities/user";
import { RequestStatus } from "../../shared/model";

export const Main = () => {
	const places = useAppSelector(selectPlaces)
	const placesLoadingStatus = useAppSelector(selectPlacesLoadingStatus)
	const userLoadingStatus = useAppSelector(selectUserLoadingStatus);

	const dispatch = useAppDispatch()

	// получение информации пользователя
	useEffect(() => {
		dispatch(fetchUser())
	}, [])

	// получение карточек
	useEffect(() => {
		dispatch(fetchCards())
	}, [])

	if (placesLoadingStatus === RequestStatus.Loading || userLoadingStatus === RequestStatus.Loading) {
		return (
			<>
				<ProfileSkeleton />

				<CardSkeleton />
			</>
		)
	}

	return (
		<main>
			<Profile />

			{!places.length ? <h3>Карточек нет</h3> : <Places/>}
		</main>
	);
}
