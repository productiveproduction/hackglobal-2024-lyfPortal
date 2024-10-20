import React from 'react';
import styled from 'styled-components';
import { useTablistStore } from '../store/tablist';
import { useNavigate, useLocation } from 'react-router-dom';
import { tablistRoutes, pagesRoutes } from '../routes';

export default function Tablist() {
  const activeIndex = useTablistStore((state) => state.activeIndex);
  const setActiveIndex = useTablistStore((state) => state.setActiveIndex);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavButtonClick = (index, path) => {
    setActiveIndex(index);
    navigate(path);
  };

  const isRouteInPagesRoutes = pagesRoutes.some((route) =>
    location.pathname.startsWith(route.path)
  );

  return (
    <Navigation style={{ display: isRouteInPagesRoutes ? 'none' : 'block' }}>
      <NavContainer>
        {tablistRoutes.map((item, index) => (
          <NavButton
            key={index}
            active={activeIndex === index}
            onClick={() => handleNavButtonClick(index, item.path)}
          >
            <item.icon size={20} />
            <NavLabel>{item.title}</NavLabel>
          </NavButton>
        ))}
      </NavContainer>
    </Navigation>
  );
};

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
  border-radius: 2rem;
  border: 0.1px solid var(--theme);
  gap: 2rem;

  /* Added for outer glow effect */
  box-shadow: 0 0 50px var(--theme);
  backdrop-filter: blur(15px); /* Adjust blur radius as needed */
`;

const NavButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.active ? 'var(--accent)' : 'var(--muted)'};
  
  &:hover {
    color: ${props => props.active ? 'var(--accent)' : 'var(--muted-foreground)'};
  }
`;

const NavLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
`;

