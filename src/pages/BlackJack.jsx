import React, { useEffect, useState } from "react";
import {
  Container,
  DealerWrapper,
  PlayerWrapper,
  IMG,
  Button,
  SpaceBetweenGame,
  SpaceBetween,
  GameWrapper,
  Text,
  BetWrapper,
  Input,
  CardsWrapper,
  ImageWrapper,
} from "./BlackJack.style";
import { cards } from "../assets/images";
import { InfoModal } from "../components/InfoModal";
import { Spacer } from "../components/Spacer";

export function BlackJack() {
  const [cardPlayerImages, setCardPlayerImages] = useState([]);
  const [cardDealerImages, setCardDealerImages] = useState([]);
  const [cardState] = useState([]);
  const [gameState, setGameState] = useState({
    dealerSum: 0,
    playerSum: 0,
    canHit: true,
    canStay: true,
    dealerWon: false,
    playerWon: false,
    isPlayer: false,
    isDealer: false,
    isDraw: false,
    dealerAceCount: 0,
    playerAceCount: 0,
    dealerWallet: 0,
    playerWallet: 0,
    betQuantity: 100,
    bet: 0,
    userName: "",
    isModalVisible: false,
    playerLostMoney: false,
    dealerLostMoney: false,
  });

  let playerSum = 0;

  let dealerAceCount = 0;
  let playerAceCount = 0;

  let newCard;
  let deck = [];

  function buildDeck() {
    let cardValues = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
    let cardTypes = ["C", "D", "H", "S"];

    for (let indexTypes = 0; indexTypes < cardTypes.length; indexTypes++) {
      for (let valueIndex = 0; valueIndex < cardValues.length; valueIndex++) {
        cardState.push(cardValues[valueIndex] + "-" + cardTypes[indexTypes]);
      }
    }
  }

  function mixCards() {
    for (let indexCards = 0; indexCards < cardState.length; indexCards++) {
      let randomNumbers = Math.floor(Math.random() * cardState.length);

      let initialDeck = cardState[indexCards];

      cardState[indexCards] = cardState[randomNumbers];

      cardState[randomNumbers] = initialDeck;
    }
  }

  function getValue(newCard) {
    let data = newCard.split("-");
    let value = data[0];

    if (isNaN(value)) {
      if (value === "A") {
        return 11;
      }
      return 10;
    }

    return parseInt(value);
  }

  let dealerSum = 0;

  function startGame() {
    const dealerWallet = localStorage.getItem("dealerWallet");
    const playerWallet = localStorage.getItem("playerWallet");
    const playerName = localStorage.getItem("playerName");

    newCard = cardState.pop();
    dealerSum += getValue(newCard);
    dealerAceCount += checkAce(newCard);
    setCardDealerImages((prevValue) => [...prevValue, newCard]);

    for (let index = 0; index < 1; index++) {
      const card = cardState.pop();

      playerSum += getValue(card);
      playerAceCount += checkAce(card);
      deck.push(card);
      setCardPlayerImages((prev) => [...prev, card]);
    }

    setGameState((prev) => ({
      ...prev,
      playerSum,
      playerAceCount,
      dealerSum,
      dealerAceCount,
      canStay: true,
      canHit: true,
      dealerWallet,
      playerWallet,
      betQuantity: 100,
      playerWon: false,
      dealerWon: false,
      bet: 0,
      isPlayer: false,
      isDealer: false,
      isDraw: false,
      userName: playerName,
      isModalVisible: false,
      playerLostMoney: false,
      dealerLostMoney: false,
    }));
  }

  function hit() {
    if (!gameState.canHit) {
      return;
    }

    const card = cardState.pop();

    // here to filter dealer array with this card.
    setCardPlayerImages((prev) => [...prev, card]);

    playerSum += getValue(card);
    playerAceCount += checkAce(card);

    const newSumPlayer = (gameState.playerSum += playerSum);
    const newPlayerAceCount = (gameState.playerAceCount += playerAceCount);

    setGameState((prev) => ({
      ...prev,
      playerSum: newSumPlayer,
      playerAceCount: newPlayerAceCount,
    }));

    if (reduceAce(newSumPlayer, newPlayerAceCount) >= 21) {
      setGameState((prevValues) => ({
        ...prevValues,
        canHit: false,
        canStay: false,
      }));
    }
  }

  function stay() {
    newCard = cardState.pop();

    // here to filter player array with this newCard.

    setCardDealerImages((prevValue) => [...prevValue, newCard]);

    dealerSum += getValue(newCard);
    dealerAceCount += checkAce(newCard);

    const newSumDealer = (gameState.dealerSum += dealerSum);
    const newDealerAceCount = (gameState.dealerAceCount += dealerAceCount);

    setGameState((prev) => ({
      ...prev,
      dealerSum: newSumDealer,
      dealerAceCount: newDealerAceCount,
      canHit: false,
    }));

    if (reduceDealerAce(newSumDealer, newDealerAceCount) > 21) {
      setGameState((prevValues) => ({
        ...prevValues,
        canStay: false,
        canHit: false,
      }));
    }
  }

  useEffect(() => {
    checkDealerValue();
  }, [cardDealerImages.length]);

  function reduceAce(playerSum, playerAceCount) {
    let newPlayerSum = playerSum;
    if (playerSum > 21 && playerAceCount > 0) {
      setGameState((prev) => ({
        ...prev,
        playerAceCount: playerAceCount - 1,
        playerSum: playerSum - 10,
      }));
      newPlayerSum = newPlayerSum - 10;
    }

    return newPlayerSum;
  }

  function reduceDealerAce(dealerSum, dealerAceCount) {
    if (dealerSum > 21 && dealerAceCount > 0) {
      setGameState((prev) => ({
        ...prev,
        dealerAceCount: dealerAceCount - 1,
        dealerSum: dealerSum - 10,
      }));
    }

    return gameState.dealerSum;
  }
  function checkAce(card) {
    if (card[0] === "A") {
      return 1;
    }
    return 0;
  }

  function checkDealerValue() {
    if (cardDealerImages.length === 2) {
      if (
        gameState.dealerSum > 17 &&
        gameState.dealerSum < 21 &&
        gameState.dealerSum < gameState.playerSum
      ) {
        setGameState((prevState) => ({
          ...prevState,
          playerWon: true,
          dealerWon: false,
          canHit: false,
          canStay: false,
        }));
      }
      if (
        gameState.dealerSum > 17 &&
        gameState.dealerSum < 21 &&
        gameState.dealerSum > gameState.playerSum
      ) {
        setGameState((prevState) => ({
          ...prevState,
          dealerWon: true,
          playerWon: false,
          canHit: false,
          canStay: false,
        }));
      }
    }
    if (cardDealerImages.length === 3) {
      if (
        gameState.playerSum <= 21 &&
        gameState.playerSum > gameState.dealerSum
      ) {
        setGameState((prevState) => ({
          ...prevState,
          playerWon: true,
          dealerWon: false,
          canHit: false,
          canStay: false,
        }));
      }
      if (
        gameState.dealerSum <= 21 &&
        gameState.dealerSum > gameState.playerSum
      ) {
        setGameState((prevState) => ({
          ...prevState,
          dealerWon: true,
          playerWon: false,
          canHit: false,
          canStay: false,
        }));
      }
      if (gameState.playerSum === gameState.dealerSum) {
        setGameState((prevValue) => ({
          ...prevValue,
          isDraw: true,
          playerWon: false,
          dealerWon: false,
        }));
      }
    }
  }

  function handleApplyBet() {
    setGameState((prevValue) => ({
      ...prevValue,
      bet: gameState.betQuantity,
    }));
  }

  // WINNER CHECK
  useEffect(() => {
    console.log("gameState.dealerSum", gameState.dealerSum);
    const playerWallet = localStorage.getItem("playerWallet");
    const dealerWallet = localStorage.getItem("dealerWallet");
    if (
      gameState.dealerSum === 21 ||
      gameState.dealerWon ||
      gameState.playerSum > 21
    ) {
      const newWalletPlayerValue =
        parseInt(playerWallet) - Number(gameState.bet);
      const newWalletDealerValue =
        parseInt(dealerWallet) + Number(gameState.bet);

      localStorage.setItem("playerWallet", newWalletPlayerValue);
      localStorage.setItem("dealerWallet", newWalletDealerValue);

      setGameState((prevValue) => ({
        ...prevValue,
        playerWallet: newWalletPlayerValue,
        dealerWallet: newWalletDealerValue,
        isDealer: true,
      }));
    }
    console.log("gameState.playerSum", gameState.playerSum);
    if (
      gameState.playerSum === 21 ||
      gameState.playerWon ||
      gameState.dealerSum > 21
    ) {
      const newWalletPlayerValue =
        parseInt(playerWallet) + Number(gameState.bet);
      const newWalletDealerValue =
        parseInt(dealerWallet) - Number(gameState.bet);

      localStorage.setItem("playerWallet", newWalletPlayerValue);
      localStorage.setItem("dealerWallet", newWalletDealerValue);

      setGameState((prevValue) => ({
        ...prevValue,
        playerWallet: newWalletPlayerValue,
        dealerWallet: newWalletDealerValue,
        isPlayer: true,
      }));
    }
  }, [
    gameState.dealerSum,
    gameState.playerSum,
    gameState.dealerWon,
    gameState.playerWon,
    gameState.bet,
    cardDealerImages.length,
  ]);

  function newGame() {
    localStorage.setItem("dealerWallet", 1000);
    localStorage.setItem("playerWallet", 1000);
    localStorage.setItem("playerName", gameState.userName);
    setGameState({
      dealerSum: 0,
      playerSum: 0,
      canHit: true,
      dealerAceCount: 0,
      playerAceCount: 0,
      canStay: true,
    });
    setCardPlayerImages([]);
    setCardDealerImages([]);
    buildDeck();
    mixCards();
    startGame();
    setGameState((prevState) => ({
      ...prevState,
      isModalVisible: false,
    }));
  }

  function nextGame() {
    setGameState({
      dealerSum: 0,
      playerSum: 0,
      canHit: true,
      dealerAceCount: 0,
      playerAceCount: 0,
      canStay: true,
    });
    setCardPlayerImages([]);
    setCardDealerImages([]);
    buildDeck();
    mixCards();
    startGame();
  }

  function createNewGame() {
    setGameState((prevState) => ({
      ...prevState,
      isModalVisible: true,
    }));
  }

  function isUserStartedGame() {
    const userChips = localStorage.getItem("playerWallet");
    const dealerChips = localStorage.getItem("dealerWallet");

    if (
      !userChips ||
      userChips === "0" ||
      !dealerChips ||
      dealerChips === "0"
    ) {
      return false;
    } else {
      return true;
    }
  }

  function getUserName() {
    const userName = localStorage.getItem("playerName");

    return userName;
  }

  useEffect(() => {
    isUserStartedGame();
  }, []);

  return (
    <Container>
      <InfoModal
        isVisible={gameState.isModalVisible}
        handleCloseModal={() =>
          setGameState((prevState) => ({
            ...prevState,
            isModalVisible: false,
          }))
        }
        handleCreateNewGame={newGame}
        handleGameState={setGameState}
        gameState={gameState}
      />
      <GameWrapper>
        <SpaceBetweenGame>
          <DealerWrapper>
            <Text align={"right"} type="dealer">
              Wallet: {gameState.dealerWallet}$
            </Text>

            <Spacer margin={100} />

            {cardDealerImages.length > 0 && (
              <>
                <Text size={25}>Dealer</Text>
                <Spacer margin={30} />
              </>
            )}

            {cardDealerImages.length === 1 && (
              <IMG src={cards.back} alt="card" />
            )}

            {cardDealerImages.map((data, index) => {
              return <IMG src={cards[data]} alt="card" key={index} />;
            })}

            {gameState.bet !== 0 && (
              <ImageWrapper>
                <IMG type="chips" src={cards.chips} alt="chips" />
              </ImageWrapper>
            )}
          </DealerWrapper>

          <PlayerWrapper>
            <BetWrapper>
              <div>
                <Text size={18} align="left" type="player">
                  Bet: {gameState.bet}$
                </Text>
                <Input
                  style={{ width: 50 }}
                  type="number"
                  title="bet"
                  value={gameState.betQuantity}
                  onChange={(e) =>
                    setGameState((prevValue) => ({
                      ...prevValue,
                      betQuantity: e.target.value,
                    }))
                  }
                />

                <Button
                  xSize={60}
                  ySize={32}
                  title="apply"
                  onClick={handleApplyBet}
                  bgColor={!gameState.bet ? "red" : "#0ff67f"}
                >
                  {!gameState.bet ? "Apply" : "Applied"}
                </Button>
              </div>

              <Text align="right" type="player">
                Wallet: {gameState.playerWallet}$
              </Text>
            </BetWrapper>

            {cardPlayerImages.length > 0 ? (
              <Text size={25} type="player">
                {getUserName()}
              </Text>
            ) : (
              <Text size={25} type="player">
                Welcome to Blackjack
              </Text>
            )}

            <CardsWrapper>
              {gameState.isPlayer && (
                <>
                  <Text size={18} type="won">
                    {gameState.dealerWallet < 1
                      ? "You Won all dealer's money Congrats!!"
                      : "You Won!"}
                  </Text>
                  <Spacer />
                </>
              )}

              {gameState.isDraw && (
                <>
                  <Text size={18} type="won">
                    Draw!
                  </Text>
                  <Spacer />
                </>
              )}

              {gameState.isDealer && (
                <>
                  <Text size={18} type={"lost"}>
                    {gameState.playerWallet < 1
                      ? "You lost all your money!"
                      : "You lost!"}
                  </Text>
                  <Spacer />
                </>
              )}

              {cardPlayerImages.map((data, index) => {
                return <IMG src={cards[data]} alt="card" key={index} />;
              })}
            </CardsWrapper>
            <Spacer />

            <div>
              <SpaceBetween>
                {cardPlayerImages.length > 0 && (
                  <>
                    {gameState.canHit && <Button onClick={hit}>Hit</Button>}
                    {gameState.canStay && <Button onClick={stay}>Stay</Button>}
                  </>
                )}

                {isUserStartedGame() && (
                  <Button onClick={nextGame}>
                    {cardPlayerImages.length < 1 ? "Continue" : "Next game"}
                  </Button>
                )}
                <Button
                  textColor="white"
                  onClick={createNewGame}
                  bgColor="#bb0e0e"
                  xSize={70}
                >
                  New game
                </Button>
              </SpaceBetween>
            </div>
          </PlayerWrapper>
        </SpaceBetweenGame>
      </GameWrapper>
    </Container>
  );
}
