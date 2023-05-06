import styled from "styled-components";

export const Spacer = styled.div`
  width: 100%;
  margin-bottom: ${({ margin }) => (margin ? `${margin}px` : "10px")};
`;
