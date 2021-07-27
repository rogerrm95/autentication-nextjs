import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'
import { signOut } from '../context/AuthContext'
import { AuthTokenError } from '../erros/AuthTokenError'

let isRefreshing = false
let failedRequestQueue = []

export function setupAPIClient(ctx = undefined) {
    let cookies = parseCookies(ctx)

    const api = axios.create({
        baseURL: 'http://localhost:3333',
        headers: {
            Authorization: `Bearer ${cookies['petmania.token']}`
        }
    })

    api.interceptors.response.use(response => response, (responseError: AxiosError) => {
        if (responseError.response.status === 401) {
            if (responseError.response.data?.code === 'token.expired') {
                // Renovar o TOKEN
                cookies = parseCookies(ctx)

                const { 'petmania.refreshToken': refreshToken } = cookies
                const originalConfig = responseError.config

                if (!isRefreshing) {
                    isRefreshing = true

                    api.post('/refresh', {
                        refreshToken,
                    }).then(res => {
                        const { token } = res.data

                        setCookie(ctx, 'petmania.token', token, {
                            maxAge: 60 * 60 * 24 * 30,
                            path: '/'
                        })
                        setCookie(ctx, 'petmania.refreshToken', res.data.refreshToken, {
                            maxAge: 60 * 60 * 24 * 30,
                            path: '/'
                        })

                        api.defaults.headers['Authorization'] = `Bearer ${token}`

                        failedRequestQueue.forEach(request => request.onSuccess(token))
                        failedRequestQueue = []
                    }).catch(error => {
                        failedRequestQueue.forEach(request => request.onFailure(error))
                        failedRequestQueue = []

                        if (process.browser) {
                            signOut()
                        }

                    }).finally(() => {
                        isRefreshing = false
                    })
                }

                return new Promise((resolve, reject) => {
                    failedRequestQueue.push({
                        onSuccess: (token: string) => {
                            originalConfig.headers['Authorization'] = `Bearer ${token}`

                            resolve(api(originalConfig))
                        },
                        onFailure: (error: AxiosError) => {
                            reject(error)
                        }
                    })
                })

            } else {
                // deslogar o usuario
                if (process.browser) {
                    signOut()
                } else {
                    return Promise.reject(new AuthTokenError())
                }

            }
        }
        return Promise.reject(responseError)
    });

    return api;
}
