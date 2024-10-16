import { useState } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { Button } from './components/Button'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <AppContainer>
      <LogoContainer>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <Logo src={viteLogo} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <Logo src={reactLogo} className="react" alt="React logo" isReact />
        </a>
      </LogoContainer>
      <Title>Vite + React</Title>
      <Card>
        <Button variant="primary" size="medium" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.jsx</code> and save to Template HMR
        </p>
      </Card>
      <ReadTheDocs>
        Click on the Vite and React logos to learn more
      </ReadTheDocs>
    </AppContainer>
  )
}

const logoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Logo = styled.img`
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;

  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }

  &.react:hover {
    filter: drop-shadow(0 0 2em #61dafbaa);
  }

  ${props => props.isReact && css`
    @media (prefers-reduced-motion: no-preference) {
      animation: ${logoSpin} infinite 20s linear;
    }
  `}
`

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
`

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
`

const Title = styled.h1`
  font-size: 3.2em;
  line-height: 1.1;
`

const Card = styled.div`
  padding: 2em;
`

const ReadTheDocs = styled.p`
  color: #888;
`