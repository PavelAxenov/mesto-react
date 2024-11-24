import {BASE_REQUEST_HEADERS, BASE_REQUEST_URL} from "../../../shared/model";

// Отправляет аватар пользователя на сервер
export function updateUserAvatar(avatar: string) {
	return fetch(`${BASE_REQUEST_URL}/users/me/avatar`, {
		method: 'PATCH',
		headers: BASE_REQUEST_HEADERS,
		body: JSON.stringify({avatar}),
	})
}