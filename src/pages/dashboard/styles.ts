import styled from 'styled-components'

export const DashboardContainer = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    gap: 16px;

    .button-box {
        width: 160px;
        transition: filter 0.2s;

        &:hover {
            filter: brightness(0.7);
        }
    }


    
`