import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./reducers/UserSlice";
import cardsSlice from "./reducers/CardsSlice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		cards: cardsSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch