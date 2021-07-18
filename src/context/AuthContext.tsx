import { createContext, ReactNode } from 'react'

type SignCredentials = {
    username: string,
    password: string
}

type AuthContextData = {
    signIn(credentials: SignCredentials): Promise<void>;
    isAuthenticated: boolean
}

type AuthProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
    const isAuthenticated = false

    async function signIn({ username, password }: SignCredentials) {
        console.log({ username, password })
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}