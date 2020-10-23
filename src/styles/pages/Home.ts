import styled from 'styled-components'

const Base = styled.div`
  ${
  props => props?.justifyContent ? `justify-content:${props.justifyContent};` : ''
};
    ${
  props => props?.alignItems ? `align-items:${props.alignItems};` : ''
};
  ${
  props => props?.flexDirection ? `flex-direction:${props.flexDirection};` : ''
};
`
export const Container = styled(Base)`
  width: 100vw;
  height: 100vh;
  display: flex;
`
