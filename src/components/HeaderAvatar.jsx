import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function HeaderAvatar() {
  const navigate = useNavigate();

  return (
    <AvatarButton
      type="button"
      aria-haspopup="dialog"
      aria-expanded="false"
      data-state="closed"
      onClick={() => navigate('/profile')}
    >
      <AvatarWrapper>
        <AvatarInner>
          <div
            className="paper"
            style={{
              borderRadius: '50px',
              display: 'inline-block',
              margin: 0,
              overflow: 'hidden',
              padding: 0,
              backgroundColor: 'rgb(241, 122, 2)',
              height: 24,
              width: 24,
            }}
          >
            {/* SVG content remains the same */}
            <svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" height="24" width="24">
              <rect x="0" y="0" rx="0" ry="0" height="24" width="24" transform="translate(-1.2332905091291164 -4.430301221921496) rotate(343.0 12 12)" fill="#fc1983"></rect>
              <rect x="0" y="0" rx="0" ry="0" height="24" width="24" transform="translate(-12.456515937200978 -6.415614192086515) rotate(349.1 12 12)" fill="#2482e1"></rect>
              <rect x="0" y="0" rx="0" ry="0" height="24" width="24" transform="translate(0.3779682316957686 22.908005956744507) rotate(115.9 12 12)" fill="#018c7c"></rect>
              <rect x="0" y="0" rx="0" ry="0" height="24" width="24" transform="translate(-22.877692254326846 -8.365994035952065) rotate(352.6 12 12)" fill="#15bbf2"></rect>
            </svg>
          </div>
        </AvatarInner>
      </AvatarWrapper>
      <NotificationDot />
    </AvatarButton>
  )
}

const AvatarButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 500;
  transition: colors 0.2s;
  padding: 0.5rem 1rem;
  position: relative;
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  
  &:focus-visible {
    outline: none;
    ring: 2px;
    ring-offset: 2px;
  }
  
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const AvatarWrapper = styled.span`
  position: relative;
  display: flex;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 9999px;
  width: 2rem;
  height: 2rem;
`;

const AvatarInner = styled.span`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color: #f5f5f5;
`;

const NotificationDot = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  width: 0.5rem;
  height: 0.5rem;
  background-color: #ef4444;
  border-radius: 9999px;
`;