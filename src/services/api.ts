import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'

let cookies = parseCookies()

export const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
        Authorization: `Bearer ${cookies['petmania.token']}`
    }
})

api.interceptors.response.use(response => response, (responseError: AxiosError) => {
    if (responseError.response.status === 401) {
        if (responseError.response.data?.code === 'token.expired') {
            // Renovar o TOKEN
            cookies = parseCookies()

            const { 'petmania.refreshToken': refreshToken } = cookies

            api.post('/refresh', {
                refreshToken
            }).then(res => {
                const { token } = res.data

                setCookie(undefined, 'petmania.token', token, {
                    maxAge: 60 * 60 * 24 * 30,
                    path: '/'
                })
                setCookie(undefined, 'petmania.refreshToken', res.data.refreshToken, {
                    maxAge: 60 * 60 * 24 * 30,
                    path: '/'
                })

                api.defaults.headers['Authorization'] = `Bearer ${token}`
            })

        } else {
            // deslogar o usuario
        }
    }
})