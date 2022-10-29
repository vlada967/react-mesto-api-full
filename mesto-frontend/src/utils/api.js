class Api {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    _getToken() {
        return localStorage.getItem('token');
    }

    getProfileInfo() {
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this._getToken()}`,
            }
        })
            .then((response) => this._checkResponse(response))
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this._getToken()}`,
            }
        })
            .then((response) => this._checkResponse(response))
    }

    editProfile(name, job) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this._getToken()}`,
            },
            body: JSON.stringify({
                name: name,
                about: job
            })
        })
            .then((response) => this._checkResponse(response))
    }

    addCard(name, link) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this._getToken()}`,
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then((response) => this._checkResponse(response))
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this._getToken()}`,
            }
        })
            .then((response) => this._checkResponse(response))
    }

    toggleLike(id, isLiked) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: isLiked ? "PUT" : "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this._getToken()}`,
            }
        })
            .then((response) => this._checkResponse(response))
    }

    editAvatar(link) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this._getToken()}`,
            },
            body: JSON.stringify({
                avatar: link
            })
        })
            .then((response) => this._checkResponse(response))
    }

}

const api = new Api({
    baseUrl: '//study.mesto.nomoredomains.icu'
});

export default api;