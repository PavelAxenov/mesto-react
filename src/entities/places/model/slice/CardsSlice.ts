import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICard, IDeletedCardResponse} from "../types/places";
import {fetchCards} from "../services/fetchCards";
import {deleteCard} from "../services/deleteCard";
import {changeLikeCardStatus} from "../services/changeLikeCardStatus";
import {addCard} from "../services/addCard";

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
	places: [],
	placesLoadingStatus: 'loading',
	changePlaceStatus: 'loading',
	error: null,
	likedCard: null,
	deletedCard: null,
	addedCard: null,
};


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
