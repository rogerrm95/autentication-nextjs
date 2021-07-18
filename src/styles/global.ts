import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: 'border-box';
        margin: 0;
        padding: 0;
    }

    body {
        width: 100%;
        height: 100%;

        background-color: #d5eaff;
        color: #283757;
        font-family: 'Roboto', sans-serif;
        
    }

    #__next {
        width: 100vw;
        height: 100vh;
    }

    input {
        border: none;
        padding: 8px;
        outline: none;
        font-family: 'Roboto', sans-serif;
        color: #283757;
    }
`