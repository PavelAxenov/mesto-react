import {createAsyncThunk} from "@reduxjs/toolkit";
import {ChangedCardType, ICard} from "../types/places";
import {CARDS_SLICE_NAME} from "../../../../shared/model";
import {ApiClient} from "../../../../shared/api";

// добавляем карточку
export const addCard = createAsyncThunk(
	`${CARDS_SLICE_NAME}/addCard`,
	async (data: ChangedCardType): Promise<ICard | null> => {
		try {
			const res = await ApiClient.prototype.post('cards', data);

			debugger
			if (res.ok) {
				return res.json()
			}

			return null;
		} catch (e: unknown) {
			throw new Error(`Ошибка лайка/дизлайка: ${e}`);
		}
	})