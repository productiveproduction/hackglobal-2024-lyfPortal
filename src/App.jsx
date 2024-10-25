import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components'
import Header from './components/Header'
import Tablist from './components/Tablist'
import Pages from './routes/Pages';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <AppContainer>
          <Tablist/>
          <Pages/>
        </AppContainer>
      </BrowserRouter>
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