import {RootState} from "../../../../shared/model";


export const selectUserStore = (state: RootState) => state.user;
export const selectUserInfo = (state: RootState) => selectUserStore(state).userInfo;
export const selectUserLoadingStatus = (state: RootState) => selectUserStore(state).userLoadingStatus;
