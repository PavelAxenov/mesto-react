export interface IUserInfo {
	_id: string,
	name: string,
	about: string,
	avatar: string,
	cohort: string
}

export type ChangedUserInfoType = Pick<IUserInfo, 'name' | 'about'>