


const url = 'https://mesto.nomoreparties.co/v1/cohort-33'
const headers = {
	authorization: '69522f9a-338d-49d0-a4b9-0f060a2c041a',
	'Content-Type': 'application/json'
}

// Отправляет аватар пользователя на сервер
export function updateUserAvatar(avatar: string) {
	return fetch(`${url}/users/me/avatar`, {
		method: 'PATCH',
		headers: headers,
		body: JSON.stringify({avatar}),
	})
}