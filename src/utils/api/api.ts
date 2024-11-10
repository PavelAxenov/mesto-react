import {ChangedCardType, IApiConstructor, ICard, IDeletedCardResponse, IUserInfo} from "./types";
import {changeUserAvatar, changeUserInfo} from "../../store/reducers/UserSlice";

class Api {
	private readonly _url: string;
	private readonly _headers: Record<string, string>;

	constructor({ url, headers }: IApiConstructor) {
		this._url = url;
		this._headers = headers;
	}

	_checkResponse(res: Response) {
		return res.ok ? res.json() : Promise.reject(`Ошибка: ${res}`);
	}

	// Получает все карточки
	async getCards() {
		return fetch(`${this._url}/cards`, {
			headers: this._headers
		})
	}

	// Получает информацию о пользователе
	getUserInfo() {
		return fetch(`${this._url}/users/me`, {
			headers: this._headers,
		})
	}

	// Отправляет информацию о пользователе на сервер
	changeUserInfo(name: string, about: string) {
		return fetch(`${this._url}/users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				name,
				about,
			})
		})
	}

	// Отправляет аватар пользователя на сервер
	changeUserAvatar(avatar: string) {
		return fetch(`${this._url}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({avatar}),
		})
	}

	// Отправляет карточку на сервер
	postCard({ name, link }: ChangedCardType) {
		return fetch(`${this._url}/cards`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				name,
				link,
			})
		})
	}

	// Удаляет карточку с сервера
	deleteCard(cardId: string) {
		return fetch(`${this._url}/cards/${cardId}`, {
			method: 'DELETE',
			headers: this._headers,
		})
	}

	// Переключение лайка
	changeLikeCardStatus(cardId: string, isLiked: boolean) {
		return fetch(`${this._url}/cards/likes/${cardId}`, {
			method: `${isLiked ? 'PUT' : 'DELETE'}`,
			headers: this._headers,
		})
	}
}

const api = new Api({
	url: 'https://mesto.nomoreparties.co/v1/cohort-33',
	headers: {
		authorization: '69522f9a-338d-49d0-a4b9-0f060a2c041a',
		'Content-Type': 'application/json'
	}
})

export default api;