import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import api from "../../utils/api/api";
import {ChangedCardType, ICard, IDeletedCardResponse} from "../../utils/api/types";

interface ICardsState {
	places: ICard[],
	placesLoadingStatus: 'loading' | 'resolved' | 'rejected'; // статусы когда мы загружаем карточки + отображение скелетона
	changePlaceStatus: 'loading' | 'resolved' | 'rejected'; // статусы когда мы удаляем или лайкаем карточку
	error: unknown;
	likedCard: ICard | null;
	deletedCard: ICard | null;
	addedCard: ICard | null;
}

const initialState: ICardsState = {
	places: null,
	placesLoadingStatus: 'loading',
	changePlaceStatus: 'loading',
	error: null,
	likedCard: null,
	deletedCard: null,
	addedCard: null,
};

// получение всех карточек
export const fetchCards = createAsyncThunk(
	'places/fetchCards',
	async (): Promise<ICard[]> => {
		try {
			const res = await api.getCards();

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

// Удаление карточки
export const deleteCard = createAsyncThunk(
	'places/deleteCard',
	async (card: ICard): Promise<IDeletedCardResponse | null> => {
		try {
			const res = await api.deleteCard(card._id);

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

// смена лайка карточки
export const changeLikeCardStatus = createAsyncThunk(
	'places/changeLikeCardStatus',
	async (data: {cardId: string, isLiked: boolean}): Promise<ICard | null> => {
		try {
			const res = await api.changeLikeCardStatus(data.cardId, !data.isLiked);

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

// добавляем карточку
export const addCard = createAsyncThunk(
	'places/addCard',
	async (data: ChangedCardType): Promise<ICard | null> => {
		try {
			const res = await api.postCard(data);

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

export const cardsSlice = createSlice({
	name: 'places',
	initialState,
	reducers: {
		setCardsByDelete: (state, action: PayloadAction<string>) => {
			state.places = state.places.filter((c: ICard) => c._id !== action.payload);
		},
		setCardsByLike: (state, action: PayloadAction<ICard>) => {
			state.places = state.places.map((card: ICard) => card._id === action.payload._id ? action.payload : card);
		},
		setLikedCard: (state, action: PayloadAction<ICard | null>) => {
			state.likedCard = action.payload;
		},
		setDeletedCard: (state, action: PayloadAction<ICard | null>) => {
			if (!action.payload) {
				state.deletedCard = null;
			}

			state.deletedCard = action.payload;
		},
		setAddedCard: (state, action: PayloadAction<ICard | null>) => {
			if (!action.payload) {
				state.addedCard = null;
			}
			state.places = [action.payload, ...state.places];
		}
	},
	extraReducers: (builder) => {
		builder
			// получение карточек
			.addCase(fetchCards.pending.type, (state: ICardsState) => {
				state.placesLoadingStatus = 'loading';
				state.error = null;
			})
			.addCase(fetchCards.fulfilled.type, (state: ICardsState, action: PayloadAction<ICard[]>) => {
				state.placesLoadingStatus = 'resolved';
				state.places = action.payload;
			})
			.addCase(fetchCards.rejected.type, (state: ICardsState, action: PayloadAction<unknown>) => {
				state.placesLoadingStatus = 'rejected';
				state.places = null
				state.error = action.payload;
			})

			// удаление карточки
			.addCase(deleteCard.pending.type, (state: ICardsState) => {
				state.changePlaceStatus = 'loading';
				state.error = null;
			})
			.addCase(deleteCard.fulfilled.type, (state: ICardsState, action: PayloadAction<IDeletedCardResponse | null>) => {
				state.changePlaceStatus = 'resolved';
				state.deletedCard = action.payload.card;
			})
			.addCase(deleteCard.rejected.type, (state: ICardsState, action: PayloadAction<unknown>) => {
				state.changePlaceStatus = 'rejected';
				state.error = action.payload;
			})

			// лайк карточки
			.addCase(changeLikeCardStatus.pending.type, (state: ICardsState) => {
				state.changePlaceStatus = 'loading';
				state.error = null;
			})
			.addCase(changeLikeCardStatus.fulfilled.type, (state: ICardsState, action: PayloadAction<ICard>) => {
				state.changePlaceStatus = 'resolved';
				state.likedCard = action.payload;
			})
			.addCase(changeLikeCardStatus.rejected.type, (state: ICardsState, action: PayloadAction<unknown>) => {
				state.changePlaceStatus = 'rejected';
				state.error = action.payload;
			})

			// добавление карточки
			.addCase(addCard.pending.type, (state: ICardsState) => {
				state.changePlaceStatus = 'loading';
				state.error = null;
			})
			.addCase(addCard.fulfilled.type, (state: ICardsState, action: PayloadAction<ICard>) => {
				state.changePlaceStatus = 'resolved';
				state.addedCard = action.payload;
			})
			.addCase(addCard.rejected.type, (state: ICardsState, action: PayloadAction<unknown>) => {
				state.changePlaceStatus = 'rejected';
				state.error = action.payload;
			});
	}
})

export const { setCardsByDelete, setCardsByLike, setLikedCard, setDeletedCard, setAddedCard } = cardsSlice.actions
export default cardsSlice.reducer;
