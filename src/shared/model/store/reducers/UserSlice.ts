import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import api from "../../../api/api";
import {ChangedUserInfoType, IUserInfo} from "../../../api/types";

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

export const fetchUser = createAsyncThunk(
	'user/fetchUser',
	async (): Promise<IUserInfo> => {
	try {
		const res = await api.getUserInfo();

		if (res.ok) {
			return res.json()
		}
		console.log(res);
	} catch (e: unknown) {
		console.log('Ошибка получения данных пользователя');
		throw new Error(e as string);
	}
})

export const changeUserInfo = createAsyncThunk(
	'user/changeUserInfo',
	async (data: ChangedUserInfoType): Promise<IUserInfo> => {
	try {
		const res = await api.changeUserInfo(data.name, data.about);

		if (res.ok) {
			return res.json()
		}
		console.log(res);
	} catch (e: unknown) {
		console.log('Ошибка изменения данных пользователя');
		throw new Error(e as string);
	}
})

export const changeUserAvatar = createAsyncThunk(
	'user/changeUserAvatar',
	async (avatar: string): Promise<IUserInfo> => {
	try {
		const res = await api.changeUserAvatar(avatar);

		if (res.ok) {
			return res.json()
		}
		console.log(res);
	} catch (e: unknown) {
		console.log('Ошибка изменения аватара');
		throw new Error(e as string);
	}
})

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
