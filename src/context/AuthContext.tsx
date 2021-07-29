import { createContext, ReactNode, useEffect, useState } from 'react'
import Router from 'next/router'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { api } from '../services/apiClient'

type SignCredentials = {
    email: string,
    password: string
}

type AuthContextData = {
    signIn: (credentials: SignCredentials) => Promise<void>,
    signOut: () => void,
    isAuthenticated: boolean,
    isLoading: boolean,
    user: User
}

type AuthProviderProps = {
    children: ReactNode
}

type User = {
    email: string,
    permissions: string[],
    roles: string[]
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

let authChannel: BroadcastChannel

export function signOut() {
    //destroyCookie(undefined, 'petmania.token')
    //destroyCookie(undefined, 'petmania.refreshToken')

    authChannel.postMessage('signOut')

    Router.push('/')
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>()
    const isAuthenticated = !!user
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        authChannel = new BroadcastChannel('auth')

        authChannel.onmessage = (message => {
            switch (message.data) {
                case 'signOut':
                    signOut()
                    break;
                default:
                    break;
            }
        })
    }, [])

    useEffect(() => {
        const { 'petmania.token': token } = parseCookies()

        if (token) {
            api.get('/me')
                .then(response => {
                    const { email, permissions, roles } = response.data

                    setUser({ email, permissions, roles })
                })
                .catch(_ => {
                    signOut()
                })
        }
    }, [])

    async function signIn({ email, password }: SignCredentials) {
        try {
            setIsLoading(true)

            const response = await api.post('/sessions', {
                email,
                password
            })

            const { permissions, roles, token, refreshToken } = response.data

            setCookie(undefined, 'petmania.token', token, {
                maxAge: 60 * 60 * 24 * 30, // 30 dia - neste caso, pode ser um período longo //
                path: '/'
            })
            setCookie(undefined, 'petmania.refreshToken', refreshToken, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/'
            })

            setUser({
                email,
                permissions,
                roles
            })

            setIsLoading(false)
            Router.push('/dashboard')
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

// sessionStorage -> sessão apenas
// localStorage -> Não tem acesso ao lado do servidor (serverless/SSR)
// cookies -> Acessível do lado do servidor (SSR) <- Será o método utilizado //