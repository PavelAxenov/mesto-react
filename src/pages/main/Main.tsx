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

	const dispatch = useAppDispatch()


	// получение карточек
	useEffect(() => {
		dispatch(fetchCards())
	}, [])

	if (placesLoadingStatus === RequestStatus.Loading) {
		return (
			<>
				<CardSkeleton />
			</>
		)
	}

	return (
		<main>
			{!places.length ? <h3>Карточек нет</h3> : <Places/>}
		</main>
	);
}
