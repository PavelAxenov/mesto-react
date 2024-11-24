export { fetchUser } from './model/services/fetch-user/fetchUser'
export { changeUserInfo } from './model/services/change-user-info/changeUserInfo'
export { changeUserAvatar } from './model/services/change-user-avatar/changeUserAvatar'

export type { IUserInfo, ChangedUserInfoType } from './model/types/user'

export { setUserInfo } from './model/slice/UserSlice'

export { selectUserStore, selectUserInfo, selectUserLoadingStatus } from './model/selectors/selectors'