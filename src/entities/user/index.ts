export { fetchUser } from './model/services/fetchUser'
export { changeUserInfo } from './model/services/changeUserInfo'
export { changeUserAvatar } from './model/services/changeUserAvatar'

export type { IUserInfo, ChangedUserInfoType } from './model/types/user'

export { setUserInfo } from './model/slice/UserSlice'

export { selectUserStore, selectUserInfo, selectUserLoadingStatus } from './model/selectors/selectors'