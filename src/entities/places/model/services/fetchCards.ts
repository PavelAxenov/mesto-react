import {ICard} from "../types/places";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {getPlaces} from "../../api/getPlaces";

// получение всех карточек
export const fetchCards = createAsyncThunk(
	'places/fetchCards',
	async (): Promise<ICard[]> => {
		try {
			const res = await getPlaces();

			if (res.ok) {
				return res.json()
			}

			console.log(res);
			return [];
		} catch (e: unknown) {
			console.log('Ошибка получения данных пользователя');
			throw new Error(e as string);
		}
	})