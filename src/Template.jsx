import React from 'react';
import styled from 'styled-components';
import { Home, Wallet, CreditCard, BarChart2, Star, Calendar, PiggyBank } from 'lucide-react';

const Container = styled.div`
  min-height: 100vh;
  background-color: black;
  color: white;
  padding: 1rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;

const Logo = styled.div`
  color: #f97316;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Title = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
`;

const InviteButton = styled.button`
  background-color: #27272a;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
`;

const MainContent = styled.main`
  text-align: center;
  max-width: 42rem;
  margin: 0 auto;
`;

const Heading = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  line-height: 1.2;
`;

const Subtitle = styled.p`
  color: #9ca3af;
  font-size: 1.125rem;
  margin-bottom: 3rem;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
`;

const FeatureItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: ${props => props.soon ? 0.5 : 1};
`;

const IconWrapper = styled.div`
  background-color: #27272a;
  padding: 1rem;
  border-radius: 9999px;
  margin-bottom: 0.75rem;
`;

const FeatureLabel = styled.span`
  font-size: 0.875rem;
  position: relative;
`;

const SoonBadge = styled.span`
  position: absolute;
  top: -1.5rem;
  right: 0;
  background-color: white;
  color: black;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
`;

const Navigation = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 1rem;
`;

const NavContainer = styled.nav`
  width: fit-content;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.875rem 1rem;
  background-color: white;
  border-radius: 2rem;
  gap: 2rem;
`;

const NavButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.active ? '#f97316' : '#9ca3af'};
  
  &:hover {
    color: ${props => props.active ? '#f97316' : '#1f2937'};
  }
`;

const NavLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
`;

export default function Template() {
  return (
    <Container>
      <Header>
        <Logo>D</Logo>
        <Title>Invest</Title>
        <InviteButton>Invite</InviteButton>
      </Header>

      <MainContent>
        <Heading>
          Invest your<br />
          crypto easily.
        </Heading>
        <Subtitle>
          We offer a range of options to help you make the most of your digital assets with ease.
        </Subtitle>

        <FeatureGrid>
          <FeatureItem>
            <IconWrapper>
              <Calendar size={24} />
            </IconWrapper>
            <FeatureLabel>Recurring Swaps</FeatureLabel>
          </FeatureItem>
          
          <FeatureItem>
            <IconWrapper>
              <PiggyBank size={24} />
            </IconWrapper>
            <FeatureLabel>Savings Vaults</FeatureLabel>
          </FeatureItem>
          
          <FeatureItem soon>
            <IconWrapper>
              <BarChart2 size={24} />
            </IconWrapper>
            <FeatureLabel>
              Limit Order
              <SoonBadge>Soon</SoonBadge>
            </FeatureLabel>
          </FeatureItem>
        </FeatureGrid>
      </MainContent>

      <Navigation>
        <NavContainer>
          <NavButton>
            <Home size={20} />
            <NavLabel>Home</NavLabel>
          </NavButton>
          <NavButton>
            <Wallet size={20} />
            <NavLabel>Wallet</NavLabel>
          </NavButton>
          <NavButton>
            <CreditCard size={20} />
            <NavLabel>Card</NavLabel>
          </NavButton>
          <NavButton active>
            <BarChart2 size={20} />
            <NavLabel>Invest</NavLabel>
          </NavButton>
          <NavButton>
            <Star size={20} />
            <NavLabel>Rewards</NavLabel>
          </NavButton>
        </NavContainer>
      </Navigation>
    </Container>
  );
};