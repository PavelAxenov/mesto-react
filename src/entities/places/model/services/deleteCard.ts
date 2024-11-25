import {createAsyncThunk} from "@reduxjs/toolkit";
import {ICard, IDeletedCardResponse} from "../types/places";
import {CARDS_SLICE_NAME} from "../../../../shared/model";
import {ApiClient} from "../../../../shared/api";

// Удаление карточки
export const deleteCard = createAsyncThunk(
	`${CARDS_SLICE_NAME}/deleteCard`,
	async (card: ICard): Promise<IDeletedCardResponse | null> => {
		try {
			const res = await ApiClient.prototype.delete(`cards/${card._id}`);

			if (res.ok) {
				return {
					message: await res.json(),
					card
				}
			}

			return null;
		} catch (e: unknown) {
			throw new Error(`Ошибка удаления карточки: ${e}`);
		}
	})