import styled from 'styled-components';

export const Flex = styled.div`
  display: flex;

  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : 'flex-start'};
  flex-direction: ${({ flexDirection }) =>
    flexDirection ? flexDirection : 'row'};
  gap: ${({ flexGap }) => (flexGap ? `${flexGap}px` : 0)};
  align-items: ${({ alignItems }) => (alignItems ? alignItems : 'flex-start')};
`;
