import React from 'react';
import styled from 'styled-components';
import { useDevice } from '../../../core/stores/deviceStore.js';
import { numberToHexUnpadded } from "@noble/curves/abstract/utils";

const TraceRouteContainer = styled.div`
  margin-left: 2rem; /* ml-5 */
  display: flex;
`;

const TraceRouteLine = styled.span`
  margin-left: 1.5rem; /* ml-4 */
  border-left: 2px solid ${({ theme }) => theme.backgroundPrimary}; /* border-l-2 border-l-backgroundPrimary */
  padding-left: 0.75rem; /* pl-2 */
  color: ${({ theme }) => theme.textPrimary}; /* text-textPrimary */
`;

export const TraceRoute = ({ from, to, route }) => {
  const { nodes } = useDevice();

  return route.length === 0 ? (
    <TraceRouteContainer>
      <TraceRouteLine>
        {to?.user?.longName}↔{from?.user?.longName}
      </TraceRouteLine>
    </TraceRouteContainer>
  ) : (
    <TraceRouteContainer>
      <TraceRouteLine>
        {to?.user?.longName}↔
        {route.map((hop) => {
          const node = nodes.get(hop);
          return `${node?.user?.longName ?? (node?.num ? numberToHexUnpadded(node.num) : "Unknown")}↔`;
        })}
        {from?.user?.longName}
      </TraceRouteLine>
    </TraceRouteContainer>
  );
};
