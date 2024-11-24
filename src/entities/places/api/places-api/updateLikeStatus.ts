import {BASE_REQUEST_HEADERS, BASE_REQUEST_URL} from "../../../../shared";

// Переключение лайка
export function updateLikeStatus(cardId: string, isLiked: boolean) {
	return fetch(`${BASE_REQUEST_URL}/cards/likes/${cardId}`, {
		method: `${isLiked ? 'PUT' : 'DELETE'}`,
		headers: BASE_REQUEST_HEADERS,
	})
}