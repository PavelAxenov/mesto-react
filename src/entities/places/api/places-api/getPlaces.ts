import {BASE_REQUEST_HEADERS, BASE_REQUEST_URL} from "../../../../shared";

// Получает все карточки
export function getPlaces() {
	return fetch(`${BASE_REQUEST_URL}/cards`, {
		headers: BASE_REQUEST_HEADERS
	})
}