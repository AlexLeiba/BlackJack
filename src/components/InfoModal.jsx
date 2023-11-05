import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Button, IMG, Text } from '../pages/BlackJack.style';
import { IconsWrapper, Input, InputWrapper } from './Input.style';
import { cards } from '../assets/images';
import { colors } from '../colors/colors';
import { Spacer } from './Spacer';
import { Container } from './InfoModal.style';
import { responsiveBreakpoints } from '../consts/responsive';
import { Flex } from './Flex/Flex.style';

const MOBILE_BREAKPOINT_MAX = responsiveBreakpoints.mobile.breakpoints.max;

export function InfoModal({
  isVisible,
  handleCreateNewGame,
  handleGameState,
  gameState,
  canContinue,
  nextGame,
  playerCards,
}) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const customStyles = {
    content: {
      minWidth: '300px',
      width: screenWidth < MOBILE_BREAKPOINT_MAX ? '300px' : '400px',
      height: '350px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      overflow: 'hidden',
      borderRadius: '30px',
    },
  };

  return (
    <Modal ariaHideApp={false} isOpen={isVisible} style={customStyles}>
      <IconsWrapper>
        {playerCards > 0 && (
          <IMG
            type='closeModal'
            src={cards.close}
            onClick={() =>
              handleGameState((prevState) => ({
                ...prevState,
                isModalVisible: false,
              }))
            }
          />
        )}
      </IconsWrapper>
      <Text type={'blackjack'} size={25}>
        {playerCards > 0 ? 'BlackJack' : 'Welcome to Blackjack'}
      </Text>

      <Text type={'modal'} size={15}>
        If you want to start a new game please introduce your name, in case you
        already played this game just click on continue, good luck!
      </Text>
      <InputWrapper>
        <Flex>
          <Text type={'modal'} size={15} align='left'>
            Name
          </Text>
        </Flex>
        <Input
          type='string'
          title='Name'
          value={gameState.userName}
          onChange={(e) =>
            handleGameState((prevValue) => ({
              ...prevValue,
              userName: e.target.value,
            }))
          }
        />
      </InputWrapper>
      <Container>
        <IconsWrapper>
          <IMG style={{ height: '20px' }} src={cards.vector2} />
          <IMG style={{ height: '20px' }} src={cards.vector1} />
          <IMG style={{ height: '20px' }} src={cards.vector4} />
          <IMG style={{ height: '20px' }} src={cards.vector3} />
        </IconsWrapper>

        <Spacer margin={40} />

        <Flex flexGap={10}>
          <Button
            disabled={gameState.userName.length < 1}
            textColor={colors.white}
            onClick={handleCreateNewGame}
            bgColor={
              gameState.userName.length > 0 ? `${colors.red}` : `${colors.gray}`
            }
          >
            New game
          </Button>

          {canContinue && (
            <Button
              textColor={colors.white}
              onClick={() =>
                playerCards > 0
                  ? handleGameState((prevState) => ({
                      ...prevState,
                      isModalVisible: false,
                    }))
                  : nextGame()
              }
              bgColor={colors.green}
            >
              Continue
            </Button>
          )}
        </Flex>
      </Container>
    </Modal>
  );
}
