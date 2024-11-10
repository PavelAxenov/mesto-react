import {Context, createContext} from "react";
import {IUserInfo} from "../utils/api/types";

export const CurrentUserContext: Context<IUserInfo> | null = createContext(null);
