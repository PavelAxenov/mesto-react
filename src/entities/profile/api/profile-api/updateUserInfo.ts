





const url = 'https://mesto.nomoreparties.co/v1/cohort-33'
const headers = {
	authorization: '69522f9a-338d-49d0-a4b9-0f060a2c041a',
	'Content-Type': 'application/json'
}

// Отправляет информацию о пользователе на сервер
export function updateUserInfo(name: string, about: string) {
	return fetch(`${url}/users/me`, {
		method: 'PATCH',
		headers: headers,
		body: JSON.stringify({
			name,
			about,
		})
	})
}