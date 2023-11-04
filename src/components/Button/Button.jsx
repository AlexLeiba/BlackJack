import React from 'react';
import { ButtonContainer } from './Button.style';

export function Button({
  children,
  disabled,
  isBet,
  onClick,
  bgColor,
  textColor,
  xSize,
  ySize,
}) {
  return (
    <ButtonContainer
      ySize={ySize}
      xSize={xSize}
      disabled={disabled}
      isBet={isBet}
      onClick={onClick}
      bgColor={bgColor}
      textColor={textColor}
    >
      {children}
    </ButtonContainer>
  );
}
