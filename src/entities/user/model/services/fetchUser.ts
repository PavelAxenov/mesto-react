import {createAsyncThunk} from "@reduxjs/toolkit";
import {IUserInfo} from "../types/user";
import {USER_SLICE_NAME} from "../../../../shared/model";
import {ApiClient} from "../../../../shared/api";

export const fetchUser = createAsyncThunk(
	`${USER_SLICE_NAME}/fetchUser`,
	async (): Promise<IUserInfo> => {
		try {
			const res = await ApiClient.prototype.get('users/me');

			if (res.ok) {
				return res.json()
			}

			return null;
		} catch (e: unknown) {
			throw new Error(`Ошибка получения данных пользователя: ${e}`);
		}
	})