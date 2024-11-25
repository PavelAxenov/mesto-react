import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUserInfo } from "../types/user";
import { USER_SLICE_NAME } from "../../../../shared/model";
import { ApiClient } from "../../../../shared/api";

export const changeUserAvatar = createAsyncThunk(
	`${USER_SLICE_NAME}/updateUserAvatar`,
	async (avatarLink: string): Promise<IUserInfo> => {
		try {
			const res = await ApiClient.prototype.patch('users/me/avatar', { avatar: avatarLink });

			if (res.ok) {
				return res.json()
			}

			return null
		} catch (e: unknown) {
			throw new Error(`Ошибка изменения аватара: ${e}`);
		}
	})