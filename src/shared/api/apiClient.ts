import { BASE_REQUEST_HEADERS, BASE_REQUEST_URL } from "../model";

export class ApiClient {
	get (url: string) {
		return fetch(`${BASE_REQUEST_URL}/${url}`, {
			method: 'GET',
			headers: BASE_REQUEST_HEADERS
		})
	}

	post (url: string, body: unknown) {
		return fetch(`${BASE_REQUEST_URL}/${url}`, {
			method: 'POST',
			headers: BASE_REQUEST_HEADERS,
			body: JSON.stringify(body)
		})
	}

	put (url: string) {
		return fetch(`${BASE_REQUEST_URL}/${url}`, {
			method: 'PUT',
			headers: BASE_REQUEST_HEADERS,
		})
	}

	delete (url: string) {
		return fetch(`${BASE_REQUEST_URL}/${url}`, {
			method: 'DELETE',
			headers: BASE_REQUEST_HEADERS,
		})
	}

	patch (url: string, body: unknown) {
		return fetch(`${BASE_REQUEST_URL}/${url}`, {
			method: 'PATCH',
			headers: BASE_REQUEST_HEADERS,
			body: JSON.stringify(body)
		})
	}
}