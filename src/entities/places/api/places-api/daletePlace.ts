import {BASE_REQUEST_HEADERS, BASE_REQUEST_URL} from "../../../../shared";

// Удаляет карточку с сервера
export function deletePlace(cardId: string) {
	return fetch(`${BASE_REQUEST_URL}/cards/${cardId}`, {
		method: 'DELETE',
		headers: BASE_REQUEST_HEADERS,
	})
}