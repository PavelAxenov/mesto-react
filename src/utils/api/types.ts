
export interface IApiConstructor {
	url: string;
	headers: Record<string, string>
}


export interface IUserInfo {
	_id: string,
	name: string,
	about: string,
	avatar: string,
	cohort: string
}

export type ChangedUserInfo = Pick<IUserInfo, 'name' | 'about'>

export interface IDeletedCardResponse {
	message: string;
}

export interface ICard {
	_id: string,
	name: string,
	link: string,
	owner: IUserInfo,
	likes: IUserInfo[],
	createdAt: string
}
export type ChangedCard = Pick<ICard, 'name' | 'link'>
