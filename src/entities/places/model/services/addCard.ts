import {createAsyncThunk} from "@reduxjs/toolkit";
import {ChangedCardType, ICard} from "../types/places";
import {addPlaces} from "../../api/addPlace";
import {CARDS_SLICE_NAME} from "../../../../shared/model";

// добавляем карточку
export const addCard = createAsyncThunk(
	`${CARDS_SLICE_NAME}/addCard`,
	async (data: ChangedCardType): Promise<ICard | null> => {
		try {
			const res = await addPlaces(data);

			debugger
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