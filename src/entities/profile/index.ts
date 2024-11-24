export type { IUserInfo, ChangedUserInfoType } from './model/types/profile'

export { setUserInfo } from './model/slice/UserSlice'

export { getUserStore, getStoreUserInfo, getStoreUserLoadingStatus, getCardsStore, getStoreAddedCard } from './model/selectors/selectors'

export { fetchUser } from './model/services/fetch-user/fetchUser'
export { changeUserInfo } from './model/services/change-user-info/changeUserInfo'
export { changeUserAvatar } from './model/services/change-user-avatar/changeUserAvatar'

export { Profile } from './ui/profile/Profile'
export { ProfileSkeleton } from './ui/skeleton/ProfileSkeleton'