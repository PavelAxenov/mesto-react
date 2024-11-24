
import {createAsyncThunk} from "@reduxjs/toolkit";
import {ICard, IDeletedCardResponse} from "../types/places";
import {deletePlace} from "../../api/daletePlace";

// Удаление карточки
export const deleteCard = createAsyncThunk(
	'places/deleteCard',
	async (card: ICard): Promise<IDeletedCardResponse | null> => {
		try {
			const res = await deletePlace(card._id);

			if (res.ok) {
				return {
					message: await res.json(),
					card
				}
			}

			console.log(res);
			return null;
		} catch (e: unknown) {
			console.log("Не удаляется карточка", e);
			throw new Error(e as string);
		}
	})