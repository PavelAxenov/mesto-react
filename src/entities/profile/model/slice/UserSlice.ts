import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchUser} from "../services/fetch-user/fetchUser";
import {changeUserInfo} from "../services/change-user-info/changeUserInfo";
import {changeUserAvatar} from "../services/change-user-avatar/changeUserAvatar";
import {IUserInfo} from "../types/profile";

interface IUserState {
	userInfo: IUserInfo | null,
	userLoadingStatus: 'loading' | 'resolved' | 'rejected' | null;
	error: string | null;
}

const initialState: IUserState = {
	userInfo: null,
	userLoadingStatus: 'loading',
	error: null
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserInfo: (state, action: PayloadAction<IUserInfo>) => {
			state.userInfo = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			// получение данных пользователя
			.addCase(fetchUser.pending.type, (state: IUserState) => {
				state.userLoadingStatus = 'loading';
				state.error = null;
			})
			.addCase(fetchUser.fulfilled.type, (state: IUserState, action: PayloadAction<IUserInfo>) => {
				state.userLoadingStatus = 'resolved';
				state.userInfo = action.payload;
			})
			.addCase(fetchUser.rejected.type, (state: IUserState, action: PayloadAction<string>) => {
				state.userLoadingStatus = 'rejected';
				state.error = action.payload;
			})

			// изменение данных пользователя
			.addCase(changeUserInfo.pending.type, (state: IUserState) => {
				state.userLoadingStatus = 'loading';
				state.error = null;
			})
			.addCase(changeUserInfo.fulfilled.type, (state: IUserState, action: PayloadAction<IUserInfo>) => {
				state.userLoadingStatus = 'resolved';
				state.userInfo = action.payload;
			})
			.addCase(changeUserInfo.rejected.type, (state: IUserState, action: PayloadAction<string>) => {
				state.userLoadingStatus = 'rejected';
				console.log('reh')
				state.error = action.payload;
			})

			// изменение аватара пользователя
			.addCase(changeUserAvatar.pending.type, (state: IUserState) => {
				state.userLoadingStatus = 'loading';
				state.error = null;
			})
			.addCase(changeUserAvatar.fulfilled.type, (state: IUserState, action: PayloadAction<IUserInfo>) => {
				state.userLoadingStatus = 'resolved';
				state.userInfo = action.payload;
			})
			.addCase(changeUserAvatar.rejected.type, (state: IUserState, action: PayloadAction<string>) => {
				state.userLoadingStatus = 'rejected';
				state.error = action.payload;
			});
	}
})

export const { setUserInfo } = userSlice.actions
export default userSlice.reducer;
