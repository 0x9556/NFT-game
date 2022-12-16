import styled from 'styled-components'

export const SelectCharacterWarapper = styled.div`
.select-character-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}

.select-character-container .character-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(300px, 1fr));
  grid-row-gap: 15px;
}


`