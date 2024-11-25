import {IUserInfo} from "../../../entities/user";
import {ICard} from "../../../entities/places";

export const enum RequestStatus {
	Loading = 'loading',
	Resolved = 'resolved',
	Rejected = 'rejected',
}

export interface IUserSchema {
	userInfo: IUserInfo | null,
	userLoadingStatus: RequestStatus | null;
	error: string | null;
}

export interface ICardsSchema {
	places: ICard[],
	placesLoadingStatus: RequestStatus; // статусы когда мы загружаем карточки + отображение скелетона
	changePlaceStatus: RequestStatus; // статусы когда мы удаляем или лайкаем карточку
	error: unknown;
	likedCard: ICard | null;
	deletedCard: ICard | null;
	addedCard: ICard | null;
}