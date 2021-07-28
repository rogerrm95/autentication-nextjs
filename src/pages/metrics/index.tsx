import { useEffect } from 'react'
import { destroyCookie } from 'nookies'

// Components //
import { LoadingScreen } from '../../components/LoadingScreen'
import { Can } from '../../components/Can'
// Hooks //
import { useAuth } from '../../hooks/useAuth'
import { useCan } from '../../hooks/useCan'
// Services //
import { withSSRAuth } from '../../utils/withSSRAuth'
import { setupAPIClient } from '../../services/api'
// Styles //
import { MetricsContainer } from './styles'

export default function Dashboard() {

    return (
        <MetricsContainer>
            <h1>
                Permissão garantida
            </h1>
        </MetricsContainer>
    )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get('/me')


    return {
        props: {}
    }
}, {
    permissions: ['metrics.list'],
    roles: ['administrator']
})