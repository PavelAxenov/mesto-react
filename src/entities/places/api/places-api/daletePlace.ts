
const url = 'https://mesto.nomoreparties.co/v1/cohort-33'
const headers = {
	authorization: '69522f9a-338d-49d0-a4b9-0f060a2c041a',
	'Content-Type': 'application/json'
}

// Удаляет карточку с сервера
export function deletePlace(cardId: string) {
	return fetch(`${url}/cards/${cardId}`, {
		method: 'DELETE',
		headers,
	})
}