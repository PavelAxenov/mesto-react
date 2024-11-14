import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../../../entities/profile/model/slice/UserSlice";
import cardsSlice from "../../../entities/places/model/slice/CardsSlice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		cards: cardsSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch