import { useEffect } from 'react'

import { LoadingScreen } from '../../components/LoadingScreen'
import { useAuth } from '../../hooks/useAuth'

import { DashboardContainer } from './styles'
import { withSSRAuth } from '../../utils/withSSRAuth'

// Services //
import { api } from '../../services/apiClient'
import { setupAPIClient } from '../../services/api'
import { AuthTokenError } from '../../erros/AuthTokenError'
import { destroyCookie } from 'nookies'

export default function Dashboard() {

    const { user, isLoading } = useAuth()

    useEffect(() => {
        api.get('/me')
            .then(res => console.log(res))
    }, [])

    if (isLoading) return <LoadingScreen />

    return (
        <DashboardContainer>
            Bem vindo, {user?.email}
        </DashboardContainer>
    )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx)
   
    const response = await apiClient.get('/me')

    return {
        props: {}
    }
})