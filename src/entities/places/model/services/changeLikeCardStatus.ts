import {createAsyncThunk} from "@reduxjs/toolkit";
import {ICard} from "../types/places";
import {updateLikeStatus} from "../../api/updateLikeStatus";

// смена лайка карточки
export const changeLikeCardStatus = createAsyncThunk(
	'places/changeLikeCardStatus',
	async (data: {cardId: string, isLiked: boolean}): Promise<ICard | null> => {
		try {
			const res = await updateLikeStatus(data.cardId, !data.isLiked);

			if (res.ok) {
				return res.json()
			}

			console.log(res);
			return null;
		} catch (e: unknown) {
			console.log("Ошибка лайка", e);
			throw new Error(e as string);
		}
	})