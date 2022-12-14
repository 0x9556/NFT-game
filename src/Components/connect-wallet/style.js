import styled from 'styled-components'

export const ConnectWallectWrapper = styled.div`
    background-size: 200% 200%;
    animation: gradient-animation 4s ease infinite;
    .cta-button {
        height: 45px;
        border: 0;
        width: auto;
        padding-left: 40px;
        padding-right: 40px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        color: white;
    }

    .connect-wallet-container {
        display: flex;
        flex-direction: column;
        margin: auto;
        max-width: 550px;
    }

    .connect-wallet-container img {
         padding-bottom: 20px;   
    }

    .connect-wallet-button {
        background-image: linear-gradient(
        to right,
        #ff8177 0%,
        #ff867a 0%,
        #ff8c7f 21%,
        #f99185 52%,
        #cf556c 78%,
        #b12a5b 100%
    );
}
`