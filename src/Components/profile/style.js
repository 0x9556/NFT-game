import styled from 'styled-components'

export const ProfileWrapper = styled.div`
.character-item {
  display: flex;
  flex-direction: column;
  position: relative;
  justify-self: center;
  align-self: center;
}

.character-item img {
  height: 300px;
  width: 350px;
  border-radius: 10px;
  object-fit: cover;
}

.character-item .name-container {
  position: absolute;
  background-color: #838383;
  border-radius: 5px;
  margin: 10px;
}

.character-item .name-container p {
  margin: 0;
  padding: 5px 10px 5px 10px;
  font-weight: bold;
}

.character-item .character-mint-button {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border: none;
  cursor: pointer;
  background-color: rgb(32, 129, 226);
  color: white;
  font-weight: bold;
  font-size: 16px;
}
`