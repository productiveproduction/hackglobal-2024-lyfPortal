import styled from 'styled-components';
import { Button } from './Button';
import HeaderAvatar from './HeaderAvatar';

export default function Header() {
  return (
    <Container>
      <HeaderContainer>
        <Button variant="outline" size="small">05e6 80%</Button>
        <LogoTitle
          alt="1"
          fetchpriority="high"
          width="50"
          height="50"
          decoding="async"
          src="/LYF-LOGO.jpg"
        />
        <RightSection>
          <Button variant="primary" size="small">Invite</Button>
          <HeaderAvatar/>
        </RightSection>
      </HeaderContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid currentColor;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  height: 4rem;
  padding: 0 1rem;

  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`;

const LogoTitle = styled.img`
  display: flex;
  align-items: center;
  margin-left: auto;
  
  @media (min-width: 1024px) {
    display: none;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 0.5rem;
`;