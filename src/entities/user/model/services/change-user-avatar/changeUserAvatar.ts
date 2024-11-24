import {createAsyncThunk} from "@reduxjs/toolkit";
import {updateUserAvatar} from "../../../api/updateUserAvatar";
import {IUserInfo} from "../../types/user";
import {USER_SLICE_NAME} from "../../../../../shared/model";

export const changeUserAvatar = createAsyncThunk(
	`${USER_SLICE_NAME}/updateUserAvatar`,
	async (avatar: string): Promise<IUserInfo> => {
		try {
			const res = await updateUserAvatar(avatar);

			if (res.ok) {
				return res.json()
			}
			console.log(res);
		} catch (e: unknown) {
			console.log('Ошибка изменения аватара');
			throw new Error(e as string);
		}
	})