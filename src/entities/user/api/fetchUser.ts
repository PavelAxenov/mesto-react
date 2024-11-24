import {BASE_REQUEST_HEADERS, BASE_REQUEST_URL} from "../../../shared/model";

// Получает информацию о пользователе
export function getUserInfo() {
	return fetch(`${BASE_REQUEST_URL}/users/me`, {
		headers: BASE_REQUEST_HEADERS,
	})
}