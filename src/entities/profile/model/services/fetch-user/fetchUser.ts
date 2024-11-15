import {createAsyncThunk} from "@reduxjs/toolkit";
import {getUserInfo} from "../../../api/profile-api/fetchUser";
import {IUserInfo} from "../../types/profile";

export const fetchUser = createAsyncThunk(
	'user/fetchUser',
	async (): Promise<IUserInfo> => {
		try {
			const res = await getUserInfo();

			if (res.ok) {
				return res.json()
			}
			console.log(res);
		} catch (e: unknown) {
			console.log('Ошибка получения данных пользователя');
			throw new Error(e as string);
		}
	})