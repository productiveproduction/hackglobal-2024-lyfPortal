import React from 'react';
import styled from 'styled-components';

const NavContainer = styled.nav`
  background-color: #415D5B;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 1rem;
  
  &:hover {
    text-decoration: underline;
    color: #87674f;
  }
`;

const SearchButton = styled.button`
  background-color: white;
  color: #415D5B;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
`;

const SubNav = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1rem 2rem;
  border-bottom: 1px solid #e5e5e5;
`;

const SubNavLink = styled.a`
  color: #666;
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    color: #000;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
  background-color: #f5f5f5;
`;

const Card = styled.div`
  width: 300px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CardImage = styled.div`
  height: 180px;
  background-color: ${props => props.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const CardContent = styled.div`
  padding: 1.5rem;
  background-color: white;
`;

const CardTitle = styled.h3`
  margin: 0;
  text-align: center;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

const CardSubtitle = styled.p`
  margin: 0;
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const BenefitsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  
  &:before {
    content: "✓";
    color: #666;
  }
`;

export default function Template2 () {
  const membershipTiers = [
    {
      name: "Classic",
      color: "#1B3F6B",
      spend: "Free to Join",
      benefits: [
        "Member Rates & Sales",
        "Birthday Gift Voucher",
        "Mobile Check-In",
        "Complimentary Wi-Fi"
      ]
    },
    {
      name: "Silver",
      color: "#808080",
      spend: "Qualifying Spend of S$1,000",
      benefits: [
        "+20% Bonus Points",
        "Priority Welcome",
        "Late Check-Out"
      ]
    },
    {
      name: "Gold",
      color: "#996515",
      spend: "Qualifying Spend of S$3,000",
      benefits: [
        "+40% Bonus Points",
        "2pm Late Check-Out",
        "Milestone Rewards",
        "Complimentary Laundrette Use"
      ]
    },
    {
      name: "Platinum",
      color: "#1A1A1A",
      spend: "Qualifying Spend of S$10,000",
      benefits: [
        "+60% Bonus Points",
        "3pm Late Check-Out",
        "Full 24-Hour Stay",
        "48-Hour Room Guarantee",
        "Free Breakfast in Europe",
        "Free Airport Transfer in MEAT"
      ]
    }
  ];

  return (
    <>
      <NavContainer>
        <Logo>ASR</Logo>
        <NavLinks>
          <NavLink href="#">View Offers</NavLink>
          <NavLink href="#">Our Brands</NavLink>
          <NavLink href="#">Our Properties</NavLink>
          <NavLink href="#">Ascott Star Rewards</NavLink>
          <NavLink href="#">Ascott For Business</NavLink>
          <NavLink href="#">Discover Destinations</NavLink>
        </NavLinks>
        <SearchButton>Search & Book</SearchButton>
      </NavContainer>

      <SubNav>
        <SubNavLink href="#" style={{ borderBottom: '2px solid #000' }}>Member Benefits</SubNavLink>
        <SubNavLink href="#">Earn & Redeem</SubNavLink>
        <SubNavLink href="#">Ascott Privilege Signatures</SubNavLink>
        <SubNavLink href="#">Buy Points</SubNavLink>
        <SubNavLink href="#">Buy Voucher</SubNavLink>
        <SubNavLink href="#">Partner Offers</SubNavLink>
        <SubNavLink href="#">Support</SubNavLink>
        <SubNavLink href="#">Join now</SubNavLink>
      </SubNav>

      <CardsContainer>
        {membershipTiers.map(tier => (
          <Card key={tier.name}>
            <CardImage bgColor={tier.color}>
              <span>ASR {tier.name}</span>
            </CardImage>
            <CardContent>
              <CardTitle>{tier.name}</CardTitle>
              <CardSubtitle>{tier.spend}</CardSubtitle>
              <BenefitsList>
                {tier.benefits.map(benefit => (
                  <BenefitItem key={benefit}>{benefit}</BenefitItem>
                ))}
              </BenefitsList>
            </CardContent>
          </Card>
        ))}
      </CardsContainer>
    </>
  );
};