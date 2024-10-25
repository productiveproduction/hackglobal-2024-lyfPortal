import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { MoveLeft } from 'lucide-react';
import { Button } from './Button';
import HeaderAvatar from './HeaderAvatar';
import { pagesRoutes } from '../routes';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation(); 

  const isRouteInPagesRoutes = pagesRoutes.some((route) =>
    location.pathname.startsWith(route.path)
  );

  return (
    <Container>
      <HeaderContainer>
        {
          isRouteInPagesRoutes
          ? <MoveLeft size={42} onClick={() => navigate(-1)} />
          : <Button 
              $variant="outline" 
              size="small"
              onClick={() => navigate('/connect')}
            >
              05e6 80% 
            </Button>
        }
        <LogoTitle
          alt="1"
          $fetchpriority="high"
          width="50"
          height="50"
          decoding="async"
          src="/LYF-LOGO.jpg"
          style={{display: isRouteInPagesRoutes ? 'none' : 'block'}}
        />
        <RightSection>
          <Button 
            $variant="primary" 
            size="small"
            onClick={() => navigate('/invite')}
          >
            Invite
          </Button>
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