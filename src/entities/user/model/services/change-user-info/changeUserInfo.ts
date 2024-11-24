import {createAsyncThunk} from "@reduxjs/toolkit";
import {updateUserInfo} from "../../../api/updateUserInfo";
import {ChangedUserInfoType, IUserInfo} from "../../types/user";

export const changeUserInfo = createAsyncThunk(
	'user/changeUserInfo',
	async (data: ChangedUserInfoType): Promise<IUserInfo> => {
		try {
			const res = await updateUserInfo(data.name, data.about);

			if (res.ok) {
				return res.json()
			}
			console.log(res);
		} catch (e: unknown) {
			console.log('Ошибка изменения данных пользователя');
			throw new Error(e as string);
		}
	})