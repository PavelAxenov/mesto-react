import {ICard} from "../types/places";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {CARDS_SLICE_NAME} from "../../../../shared/model";
import {ApiClient} from "../../../../shared/api";

// получение всех карточек
export const fetchCards = createAsyncThunk(
	`${CARDS_SLICE_NAME}/fetchCards`,
	async (): Promise<ICard[]> => {
		try {
			const res = await ApiClient.prototype.get('cards')

			if (res.ok) {
				return res.json()
			}

			return [];
		} catch (e: unknown) {
			throw new Error(`Ошибка получения данных пользователя: ${e}`);
		}
	})