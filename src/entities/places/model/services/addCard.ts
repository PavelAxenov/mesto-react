
import {createAsyncThunk} from "@reduxjs/toolkit";
import {ChangedCardType, ICard} from "../types/places";
import {addPlaces} from "../../api/places-api/addPlace";

// добавляем карточку
export const addCard = createAsyncThunk(
	'places/addCard',
	async (data: ChangedCardType): Promise<ICard | null> => {
		try {
			const res = await addPlaces(data);

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