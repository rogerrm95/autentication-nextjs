import Router from 'next/router'
import { setCookie, parseCookies } from 'nookies'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../services/api'

type SignCredentials = {
    email: string,
    password: string
}

type AuthContextData = {
    signIn(credentials: SignCredentials): Promise<void>;
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

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>()
    const isAuthenticated = !!user
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const { 'petmania.token': token } = parseCookies()

        if (token) {
            api.get('/me').then(response => {
                const { email, permissions, roles } = response.data

                setUser({ email, permissions, roles })
            })
        }

    }, [])

    async function signIn({ email, password }: SignCredentials) {
        try {
            setIsLoading(true)

            const response = await api.post('sessions', {
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

            api.defaults.headers['Authorization'] = `Bearer ${token}`

            setIsLoading(false)
            Router.push('/dashboard')
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, user, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}

// sessionStorage -> sessão apenas
// localStorage -> Não tem acesso ao lado do servidor (serverless/SSR)
// cookies -> Acessível do lado do servidor (SSR) <- Será o método utilizado //