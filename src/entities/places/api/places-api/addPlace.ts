import {ChangedCardType} from "../../model/types/places";


const url = 'https://mesto.nomoreparties.co/v1/cohort-33'
const headers = {
	authorization: '69522f9a-338d-49d0-a4b9-0f060a2c041a',
	'Content-Type': 'application/json'
}

// Отправляет карточку на сервер
export function addPlaces({ name, link }: ChangedCardType) {
	return fetch(`${url}/cards`, {
		method: 'POST',
		headers,
		body: JSON.stringify({
			name,
			link,
		})
	})
}