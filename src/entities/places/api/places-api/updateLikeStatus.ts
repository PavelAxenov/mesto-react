
const url = 'https://mesto.nomoreparties.co/v1/cohort-33'
const headers = {
	authorization: '69522f9a-338d-49d0-a4b9-0f060a2c041a',
	'Content-Type': 'application/json'
}

// Переключение лайка
export function updateLikeStatus(cardId: string, isLiked: boolean) {
	return fetch(`${url}/cards/likes/${cardId}`, {
		method: `${isLiked ? 'PUT' : 'DELETE'}`,
		headers,
	})
}