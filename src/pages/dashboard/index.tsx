import { useEffect } from 'react'
import { LoadingScreen } from '../../components/LoadingScreen'
import { useAuth } from '../../hooks/useAuth'
import { api } from '../../services/api'
import { DashboardContainer } from './styles'

export default function Dashboard() {

    const { user, isLoading } = useAuth()

    useEffect(() => {
        api.get('/me').then(res => console.log(res))
            .catch(error => console.log(error))
    }, [])

    if (isLoading) return <LoadingScreen />

    return (
        <DashboardContainer>
            Bem vindo, {user?.email}
        </DashboardContainer>
    )
}