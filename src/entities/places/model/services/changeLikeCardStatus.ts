import {createAsyncThunk} from "@reduxjs/toolkit";
import {ICard} from "../types/places";
import {CARDS_SLICE_NAME} from "../../../../shared/model";
import {ApiClient} from "../../../../shared/api";

// смена лайка карточки
export const changeLikeCardStatus = createAsyncThunk(
	`${CARDS_SLICE_NAME}/changeLikeCardStatus`,
	async (data: {cardId: string, isLiked: boolean}): Promise<ICard | null> => {
		try {
			let res;

			if (!data.isLiked) {
				res = await ApiClient.prototype.put(`cards/likes/${data.cardId}`);
			} else {
				res = await ApiClient.prototype.delete(`cards/likes/${data.cardId}`);
			}

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