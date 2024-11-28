import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICard, IDeletedCardResponse } from "../types/places";
import { fetchCards } from "../services/fetchCards";
import { deleteCard } from "../services/deleteCard";
import { changeLikeCardStatus } from "../services/changeLikeCardStatus";
import { addCard } from "../services/addCard";
import {CARDS_SLICE_NAME, ICardsSchema, RequestStatus} from "../../../../shared/model";

const initialState: ICardsSchema = {
	places: [],
	placesLoadingStatus: RequestStatus.Loading,
	changePlaceStatus: RequestStatus.Loading,
	error: null,
	likedCard: null,
	deletedCard: null,
	addedCard: null,
};

export const cardsSlice = createSlice({
	name: CARDS_SLICE_NAME,
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
			.addCase(fetchCards.pending.type, (state: ICardsSchema) => {
				state.placesLoadingStatus = RequestStatus.Loading;
				state.error = null;
			})
			.addCase(fetchCards.fulfilled.type, (state: ICardsSchema, action: PayloadAction<ICard[]>) => {
				state.placesLoadingStatus = RequestStatus.Resolved;
				state.places = action.payload;
			})
			.addCase(fetchCards.rejected.type, (state: ICardsSchema, action: PayloadAction<unknown>) => {
				state.placesLoadingStatus = RequestStatus.Rejected;
				state.places = null
				state.error = action.payload;
			})

			// удаление карточки
			.addCase(deleteCard.pending.type, (state: ICardsSchema) => {
				state.changePlaceStatus = RequestStatus.Loading;
				state.error = null;
			})
			.addCase(deleteCard.fulfilled.type, (state: ICardsSchema, action: PayloadAction<IDeletedCardResponse | null>) => {
				state.changePlaceStatus = RequestStatus.Resolved;
				state.deletedCard = action.payload.card;
			})
			.addCase(deleteCard.rejected.type, (state: ICardsSchema, action: PayloadAction<unknown>) => {
				state.changePlaceStatus = RequestStatus.Rejected;
				state.error = action.payload;
			})

			// лайк карточки
			.addCase(changeLikeCardStatus.pending.type, (state: ICardsSchema) => {
				state.changePlaceStatus = RequestStatus.Loading;
				state.error = null;
			})
			.addCase(changeLikeCardStatus.fulfilled.type, (state: ICardsSchema, action: PayloadAction<ICard>) => {
				state.changePlaceStatus = RequestStatus.Resolved;
				state.likedCard = action.payload;
			})
			.addCase(changeLikeCardStatus.rejected.type, (state: ICardsSchema, action: PayloadAction<unknown>) => {
				state.changePlaceStatus = RequestStatus.Rejected;
				state.error = action.payload;
			})

			// добавление карточки
			.addCase(addCard.pending.type, (state: ICardsSchema) => {
				state.changePlaceStatus = RequestStatus.Loading;
				state.error = null;
			})
			.addCase(addCard.fulfilled.type, (state: ICardsSchema, action: PayloadAction<ICard>) => {
				state.changePlaceStatus = RequestStatus.Resolved;
				state.addedCard = action.payload;
			})
			.addCase(addCard.rejected.type, (state: ICardsSchema, action: PayloadAction<unknown>) => {
				state.changePlaceStatus = RequestStatus.Rejected;
				state.error = action.payload;
			});
	}
})

export const { setCardsByDelete, setCardsByLike, setLikedCard, setDeletedCard, setAddedCard } = cardsSlice.actions
export default cardsSlice.reducer;
