import {RootState} from "../../../../shared/model";

export const selectCardsStore = (state: RootState) => state.cards;
export const selectPlaces = (state: RootState) => selectCardsStore(state).places;
export const selectPlacesLoadingStatus = (state: RootState) => selectCardsStore(state).placesLoadingStatus;
export const selectChangePlaceStatus = (state: RootState) => selectCardsStore(state).changePlaceStatus;
export const selectLikedCard = (state: RootState) => selectCardsStore(state).likedCard;
export const selectDeletedCard = (state: RootState) => selectCardsStore(state).deletedCard;
export const selectAddedCard = (state: RootState) => selectCardsStore(state).addedCard;
