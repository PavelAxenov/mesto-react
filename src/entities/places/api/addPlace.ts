import {ChangedCardType} from "../model/types/places";
import {BASE_REQUEST_HEADERS, BASE_REQUEST_URL} from "../../../shared/model";

// Отправляет карточку на сервер
export function addPlaces({ name, link }: ChangedCardType) {
	return fetch(`${BASE_REQUEST_URL}/cards`, {
		method: 'POST',
		headers: BASE_REQUEST_HEADERS,
		body: JSON.stringify({
			name,
			link,
		})
	})
}