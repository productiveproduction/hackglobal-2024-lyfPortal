import { useState } from 'react'
import styled from 'styled-components'
import { Button } from './components/Button'
import Header from './components/Header'
import Tablist from './components/Tablist'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>
    <AppContainer>
      <Tablist/>
      <Title>Vite + React</Title>
      <Card>
        <Button variant="primary" size="medium" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
      </Card>
    </AppContainer>
    </>
  )
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 0%;
  width: 100%;
`

const Title = styled.h1`
  font-size: 3.2em;
  line-height: 1.1;
`

const Card = styled.div`
  padding: 2em;
`