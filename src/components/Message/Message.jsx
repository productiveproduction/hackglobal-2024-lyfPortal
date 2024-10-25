import React from 'react';
import styled from 'styled-components';
// import { Hashicon } from '@emeraldpay/hashicon-react';
import {
  User,
  AlertCircleIcon,
  CheckCircle2Icon,
  CircleEllipsisIcon,
} from 'lucide-react';

// Styled Components
const MessageContainer = styled.div`
  margin: 0 1.5rem; /* mx-4 */
  margin-top: 0.75rem; /* mt-2 */
  display: flex;
  flex-direction: column; /* For gap to work properly */
  gap: 0.5rem; /* gap-2 */
`;

const SenderInfoContainer = styled.div`
  display: flex;
  gap: 0.5rem; /* gap-2 */
`;

const HashiconContainer = styled.div`
  width: 2.25rem; /* w-6 */
  cursor: pointer;
`;

const SenderName = styled.span`
  cursor: pointer;
  font-weight: 500; /* font-medium */
  color: ${({ theme }) => theme.textPrimary}; /* text-textPrimary */
`;

const MessageTimestamp = styled.span`
  margin-top: 0.25rem; /* mt-1 */
  font-family: monospace; /* font-mono */
  font-size: 0.75rem; /* text-xs */
  color: ${({ theme }) => theme.textSecondary}; /* text-textSecondary */
`;

const MessageContentContainer = styled.div`
  margin-left: 0.5rem; /* ml-1 */
  display: flex;
`;

const MessageIcon = styled.span`
  margin: auto 0; /* my-auto */
  color: ${({ theme }) => theme.textSecondary}; /* text-textSecondary */
`;

const MessageText = styled.span`
  margin-left: 1.5rem; /* ml-4 */
  border-left: 2px solid ${({ theme }) => theme.backgroundPrimary}; /* border-l-2 border-l-backgroundPrimary */
  padding-left: 0.75rem; /* pl-2 */
  color: ${({ theme, state }) =>
    state === 'ack' ? theme.textPrimary : theme.textSecondary};
`;

const LastMessageContainer = styled.div`
  margin-left: 2rem; /* ml-5 */
  display: flex;
`;

// Component
export const Message = ({ lastMsgSameUser, message, sender }) => {
  const renderIcon = () => {
    switch (message.state) {
      case 'ack':
        return (
          <MessageIcon>
            <CheckCircle2Icon size={16} />
          </MessageIcon>
        );
      case 'waiting':
        return (
          <MessageIcon>
            <CircleEllipsisIcon size={16} />
          </MessageIcon>
        );
      default:
        return (
          <MessageIcon>
            <AlertCircleIcon size={16} />
          </MessageIcon>
        );
    }
  };

  const renderMessageContent = () => {
    return (
      <MessageText state={message.state}>{message.data}</MessageText>
    );
  };

  return lastMsgSameUser ? (
    <LastMessageContainer>
      {renderIcon()}
      {renderMessageContent()}
    </LastMessageContainer>
  ) : (
    <MessageContainer>
      <SenderInfoContainer>
        <HashiconContainer> {/* Keep the container for styling */}
          <User size={32} /> {/* Replace Hashicon with User icon */}
        </HashiconContainer>
        <SenderName>{sender?.user?.longName ?? 'UNK'}</SenderName>
        <MessageTimestamp>
          {message.rxTime.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </MessageTimestamp>
      </SenderInfoContainer>
      <MessageContentContainer>
        {renderIcon()}
        {renderMessageContent()}
      </MessageContentContainer>
    </MessageContainer>
  );
};
