import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../UI/Button.js'; 
import { Input } from '../../UI/Input.js'; 
import { useDevice } from '../../../core/stores/deviceStore.js';
import { SendIcon } from 'lucide-react';

const MessageInputContainer = styled.div`
  display: flex;
  gap: 0.5rem; /* gap-2 */
`;

const MessageInputForm = styled.form`
  width: 100%; /* w-full */
`;

const InputContainer = styled.div`
  display: flex;
  flex-grow: 1;
  gap: 0.5rem; /* gap-2 */
`;

const InputWrapper = styled.span`
  width: 100%; /* w-full */
`;


export const MessageInput = ({ to, channel }) => {
  const { connection, setMessageState, hardware } = useDevice();
  const [messageDraft, setMessageDraft] = useState('');

  const myNodeNum = hardware.myNodeNum;

  const sendText = async (message) => {
    try {
      const id = await connection?.sendText(message, to, true, channel);
      setMessageState(
        to === 'broadcast' ? 'broadcast' : 'direct',
        channel,
        to, 
        myNodeNum,
        id,
        'ack',
      );
    } catch (e) {
      setMessageState(
        to === 'broadcast' ? 'broadcast' : 'direct',
        channel,
        to,
        myNodeNum,
        e.id,
        e.error,
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendText(messageDraft);
    setMessageDraft('');
  };

  return (
    <MessageInputContainer>
      <MessageInputForm onSubmit={handleSubmit}>
        <InputContainer>
          <InputWrapper>
            <Input
              autoFocus
              minLength={1}
              placeholder="Enter Message"
              value={messageDraft}
              onChange={(e) => setMessageDraft(e.target.value)}
            />
          </InputWrapper>
          <Button type="submit">
            <SendIcon size={16} />
          </Button>
        </InputContainer>
      </MessageInputForm>
    </MessageInputContainer>
  );
};
