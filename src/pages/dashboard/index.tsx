import { useEffect } from 'react'
import { destroyCookie } from 'nookies'
import { LoadingScreen } from '../../components/LoadingScreen' // Component //
// Hooks //
import { useAuth } from '../../hooks/useAuth'
import { useCan } from '../../hooks/useCan'
// Utils //
import { withSSRAuth } from '../../utils/withSSRAuth'
import { AuthTokenError } from '../../erros/AuthTokenError'
// Services //
import { api } from '../../services/apiClient'
import { setupAPIClient } from '../../services/api'
// Styles //
import { DashboardContainer } from './styles'
import { Can } from '../../components/Can'
import { LogoutButton } from '../../components/LogoutButton/indext'

export default function Dashboard() {

    const { user, isLoading, signOut } = useAuth()
    const userCanSeeMetrics = useCan({
        roles: ['administrator']
    })

    useEffect(() => {
        api.get('/me')
            .then(res => console.log(res))
    }, [])

    function handleLogoutUser() {
        signOut()
    }

    if (isLoading) return <LoadingScreen />

    return (
        <DashboardContainer>
            <h1>
                Bem vindo, {user?.email}
            </h1>

            <Can permissions={['metrics.list']}>
                Métricas
            </Can>

            <LogoutButton onClick={handleLogoutUser} />

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