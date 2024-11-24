import { RootState } from "../../../../shared";


export const getUserStore = (state: RootState) => state.user;
export const getStoreUserInfo = (state: RootState) => getUserStore(state).userInfo;
export const getStoreUserLoadingStatus = (state: RootState) => getUserStore(state).userLoadingStatus;


export const getCardsStore = (state: RootState) => state.cards;
export const getStoreAddedCard = (state: RootState) => getCardsStore(state).addedCard;
