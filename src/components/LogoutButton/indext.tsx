import { LogoutButtonContainer } from './styles'

interface LogoutButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

export function LogoutButton({ ...rest }: LogoutButtonProps) {
    return (
        <LogoutButtonContainer {...rest}>
            Sair
        </LogoutButtonContainer>
    )
}