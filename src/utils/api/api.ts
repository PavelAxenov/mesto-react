import {ChangedCard, IApiConstructor, ICard, IDeletedCardResponse, IUserInfo} from "./types";

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
	async getCards(): Promise<ICard[]> {
		return fetch(`${this._url}/cards`, {
			headers: this._headers
		})
			.then(res => res.json())
	}

	// Получает информацию о пользователе
	getUserInfo(): Promise<IUserInfo> {
		return fetch(`${this._url}/users/me`, {
			headers: this._headers,
		})
			.then(this._checkResponse)
	}

	// Отправляет информацию о пользователе на сервер
	sendProfileDatasToServer(name: string, about: string): Promise<IUserInfo> {
		return fetch(`${this._url}/users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				name,
				about,
			})
		})
			.then(this._checkResponse)
	}

	// Отправляет аватар пользователя на сервер
	sendAvatarToServer(avatar: string): Promise<IUserInfo> {
		return fetch(`${this._url}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({avatar}),
		})
			.then(this._checkResponse)
	}

	// Отправляет карточку на сервер
	postCard({ name, link }: ChangedCard): Promise<ICard> {
		return fetch(`${this._url}/cards`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				name,
				link,
			})
		})
			.then(this._checkResponse)
	}

	// Удаляет карточку с сервера
	deleteCard(cardId: string): Promise<IDeletedCardResponse> {
		return fetch(`${this._url}/cards/${cardId}`, {
			method: 'DELETE',
			headers: this._headers,
		})
			.then(this._checkResponse)
	}

	// Переключение лайка
	changeLikeCardStatus(cardId: string, isLiked: boolean): Promise<ICard> {
		return fetch(`${this._url}/cards/likes/${cardId}`, {
			method: `${isLiked ? 'PUT' : 'DELETE'}`,
			headers: this._headers,
		})
			.then(this._checkResponse)
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