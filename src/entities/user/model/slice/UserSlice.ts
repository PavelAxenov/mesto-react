import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { fetchUser } from "../services/fetch-user/fetchUser";
import { changeUserInfo } from "../services/change-user-info/changeUserInfo";
import { changeUserAvatar } from "../services/change-user-avatar/changeUserAvatar";
import { IUserInfo } from "../types/user";
import {IUserSchema, RequestStatus, USER_SLICE_NAME} from "../../../../shared/model";

const initialState: IUserSchema = {
	userInfo: null,
	userLoadingStatus: RequestStatus.Loading,
	error: null
};

export const userSlice = createSlice({
	name: USER_SLICE_NAME,
	initialState,
	reducers: {
		setUserInfo: (state, action: PayloadAction<IUserInfo>) => {
			state.userInfo = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			// получение данных пользователя
			.addCase(fetchUser.pending.type, (state: IUserSchema) => {
				state.userLoadingStatus = RequestStatus.Loading;
				state.error = null;
			})
			.addCase(fetchUser.fulfilled.type, (state: IUserSchema, action: PayloadAction<IUserInfo>) => {
				state.userLoadingStatus = RequestStatus.Resolved;
				state.userInfo = action.payload;
			})
			.addCase(fetchUser.rejected.type, (state: IUserSchema, action: PayloadAction<string>) => {
				state.userLoadingStatus = RequestStatus.Rejected;
				state.error = action.payload;
			})

			// изменение данных пользователя
			.addCase(changeUserInfo.pending.type, (state: IUserSchema) => {
				state.userLoadingStatus = RequestStatus.Loading;
				state.error = null;
			})
			.addCase(changeUserInfo.fulfilled.type, (state: IUserSchema, action: PayloadAction<IUserInfo>) => {
				state.userLoadingStatus = RequestStatus.Resolved;
				state.userInfo = action.payload;
			})
			.addCase(changeUserInfo.rejected.type, (state: IUserSchema, action: PayloadAction<string>) => {
				state.userLoadingStatus = RequestStatus.Rejected;
				console.log('reh')
				state.error = action.payload;
			})

			// изменение аватара пользователя
			.addCase(changeUserAvatar.pending.type, (state: IUserSchema) => {
				state.userLoadingStatus = RequestStatus.Loading;
				state.error = null;
			})
			.addCase(changeUserAvatar.fulfilled.type, (state: IUserSchema, action: PayloadAction<IUserInfo>) => {
				state.userLoadingStatus = RequestStatus.Resolved;
				state.userInfo = action.payload;
			})
			.addCase(changeUserAvatar.rejected.type, (state: IUserSchema, action: PayloadAction<string>) => {
				state.userLoadingStatus = RequestStatus.Rejected;
				state.error = action.payload;
			});
	}
})

export const { setUserInfo } = userSlice.actions
export default userSlice.reducer;
