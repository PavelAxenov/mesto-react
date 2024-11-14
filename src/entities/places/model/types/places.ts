import {IUserInfo} from "../../../profile";

export interface IDeletedCardResponse {
	message: string;
	card: ICard
}

export interface ICard {
	_id: string,
	name: string,
	link: string,
	owner: IUserInfo,
	likes: IUserInfo[],
	createdAt: string
}
export type ChangedCardType = Pick<ICard, 'name' | 'link'>