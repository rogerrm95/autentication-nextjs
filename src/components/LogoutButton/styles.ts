import styled from 'styled-components'

export const LogoutButtonContainer = styled.button`
    width: 100%;
    max-width: 160px;
    height: 24px;
    border-radius: 4px;
    padding: 16px;
    border: none;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #ffd26a;
    color: #283757;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;

    transition: filter 0.3s;

    &:hover{
        cursor: pointer;
        filter: brightness(0.9);
    }
`