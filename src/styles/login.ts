import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
`

export const LoginBox = styled.main`
    height: 300px;
    width: 300px;

    background-color: #A5D6F1;
    -webkit-box-shadow: 1px 1px 6px 3px rgba(0,0,0,0.15); 
    box-shadow: 1px 1px 6px 3px rgba(0,0,0,0.15);
    border-radius: 8px;
    padding: 24px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    gap: 16px;

    img {
        width: 175px;
        height: auto;
    }

    h1 {
        margin: 8px 0;
    }

    form {

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 16px;

        label {
            font-size: 14px;
        }

        input {
            margin-left: 8px;
            border-radius: 4px;
            background-color: #bddff2;
        }
    }

    button {
        margin-top: 16px;
        align-self: center;
    }
`

export const Button = styled.button`
    border: none;
    cursor: pointer;
    border-radius: 8px;
    padding: 8px;
    width: 100%;
    max-width: 200px;
    
    background-color: #ffd26a;
    color: #283757;
    font-weight: 700;
    transition: filter 0.5s;

    &:hover{
        filter: brightness(0.9);
    }
`