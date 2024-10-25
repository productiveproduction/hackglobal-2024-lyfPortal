import React from 'react';
import styled from 'styled-components';
import { Subtle } from '../../UI/Typography/Subtle.js'; 
import { useDevice } from '../../../core/stores/deviceStore.js';
import { Message } from './Message.js'; 
import { MessageInput } from './MessageInput.js';
import { TraceRoute } from './TraceRoute.js'; 
import { InboxIcon } from 'lucide-react';

const ChannelChatContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

const MessagesContainer = styled.div`
  display: flex;
  flex-grow: 1;
`;

const MessagesList = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

const TraceroutesList = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  border-left: 1px solid ${({ theme }) => theme.colors.slate[400]}; /* border-slate-400 border-l */
  ${({ traceroutes }) =>
    traceroutes === undefined && 'display: none;'} /* hidden if traceroutes is undefined */
`;

const NoMessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`;

const MessageInputContainer = styled.div`
  padding: 1rem 1.5rem 0.25rem; /* pl-3 pr-3 pt-3 pb-1 */
`;

export const ChannelChat = ({ messages, channel, to, traceroutes }) => {
  const { nodes } = useDevice();

  const renderMessages = () => {
    if (!messages) {
      return (
        <NoMessagesContainer>
          <InboxIcon />
          <Subtle>No Messages</Subtle>
        </NoMessagesContainer>
      );
    }

    return messages.map((message, index) => (
      <Message
        key={message.id}
        message={message}
        lastMsgSameUser={index === 0 ? false : messages[index - 1].from === message.from}
        sender={nodes.get(message.from)}
      />
    ));
  };

  const renderTraceroutes = () => {
    if (to === 'broadcast' || !traceroutes) {
      return (
        <NoMessagesContainer>
          <InboxIcon />
          <Subtle>No Traceroutes</Subtle>
        </NoMessagesContainer>
      );
    }

    return traceroutes.map((traceroute, index) => (
      <TraceRoute
        key={traceroute.id}
        from={nodes.get(traceroute.from)}
        to={nodes.get(traceroute.to)}
        route={traceroute.data.route}
      />
    ));
  };

  return (
    <ChannelChatContainer>
      <MessagesContainer>
        <MessagesList>{renderMessages()}</MessagesList>
        <TraceroutesList traceroutes={traceroutes}>
          {renderTraceroutes()}
        </TraceroutesList>
      </MessagesContainer>
      <MessageInputContainer>
        <MessageInput to={to} channel={channel} />
      </MessageInputContainer>
    </ChannelChatContainer>
  );
};
