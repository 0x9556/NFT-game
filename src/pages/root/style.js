import styled from 'styled-components'

export const RootWrapper = styled.div`

.App {
  height: 100vh;
  background-color: #0d1116;
  overflow: scroll;
  text-align: center;
}

.container {
  height: 100%;
  background-color: #0d1116;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.header-container {
  padding-top: 30px;
}

.header {
  margin: 0;
  font-size: 50px;
  font-weight: bold;
  color: white;
}

.sub-text {
  font-size: 25px;
  color: white;
}

.content-container {
  background-color: #a200d6;
}



.mint-button {
  background: -webkit-linear-gradient(left, #a200d6, #ff6fdf);
  background-size: 200% 200%;
  animation: gradient-animation 4s ease infinite;
  margin-right: 15px;
}

.opensea-button {
  background-color: rgb(32, 129, 226);
}

.mint-count {
  color: white;
  font-size: 18px;
  font-weight: bold;
}

.footer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
}

.twitter-logo {
  width: 35px;
  height: 35px;
}

.footer-text {
  color: white;
  font-size: 16px;
  font-weight: bold;
}

`