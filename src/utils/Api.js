class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res}`);
    }

    // Получает все карточки
    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    // Получает информацию о пользователе
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
        })
            .then(this._checkResponse)
    }

    // Отправляет информацию о пользователе на сервер
    sendProfileDatasToServer(name, about) {
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
    sendAvatarToServer(avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({avatar}),
        })
            .then(this._checkResponse)
    }

    // Отправляет карточку на сервер
    postCard({ name, link }) {
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
    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
    }

    // Переключение лайка
    toggleCardLike(cardId, method) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method,
            headers: this._headers,
        })
            .then(this._checkResponse)
    }

    changeLikeCardStatus(cardId, isLiked) {
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