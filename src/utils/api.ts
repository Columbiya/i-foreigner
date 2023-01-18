import axios from 'axios'

// использовать http для локальной разработки.
export const $api = axios.create({
    baseURL: "https://i-foreigner.pl",
    withCredentials: true
})

export const $authApi = axios.create({
    baseURL: "https://i-foreigner.pl",
    withCredentials: true
})

export interface HTTPResponse<T> {
    status: boolean
    message: string
    body: T
}

export const socialNetworksAuth = "https://i-foreigner.pl/oauth2/authorization"