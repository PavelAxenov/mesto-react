import {createAsyncThunk} from "@reduxjs/toolkit";
import {ChangedUserInfoType, IUserInfo} from "../types/user";
import {USER_SLICE_NAME} from "../../../../shared/model";
import {ApiClient} from "../../../../shared/api";

export const changeUserInfo = createAsyncThunk(
	`${USER_SLICE_NAME}/changeUserInfo`,
	async (data: ChangedUserInfoType): Promise<IUserInfo> => {
		try {
			const requestBody = {
				name: data.name,
				about: data.about,
			}

			const res = await ApiClient.prototype.patch('users/me', requestBody);

			if (res.ok) {
				return res.json()
			}

			return null;
		} catch (e: unknown) {
			throw new Error(`Ошибка изменения данных пользователя: ${e}`);
		}
	})