import {BASE_REQUEST_HEADERS, BASE_REQUEST_URL} from "../../../shared/model";

// Отправляет информацию о пользователе на сервер
export function updateUserInfo(name: string, about: string) {
	return fetch(`${BASE_REQUEST_URL}/users/me`, {
		method: 'PATCH',
		headers: BASE_REQUEST_HEADERS,
		body: JSON.stringify({
			name,
			about,
		})
	})
}