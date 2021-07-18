import { ClockLoader } from 'react-spinners'

import { SpinnerContainer } from './styles'

export function LoadingScreen() {
    return (
        <SpinnerContainer>
            <ClockLoader color="#283757" size='50' speedMultiplier={2}/>
        </SpinnerContainer>
    )
}