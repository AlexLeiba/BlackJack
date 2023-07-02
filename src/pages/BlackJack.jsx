import React, { useEffect, useState } from "react";
import {
  Container,
  DealerWrapper,
  PlayerWrapper,
  IMG,
  Button,
  SpaceBetweenGame,
  SpaceBetween,
  TableWrapper,
  Text,
  Input,
  CardsWrapper,
  ImageWrapper,
  BetContainer,
  WalletsWrapper,
  BetValueWrapper,
} from "./BlackJack.style";
import { cards } from "../assets/images";
import { InfoModal } from "../components/InfoModal";
import { Spacer } from "../components/Spacer";
import { colors } from "../colors/colors";
import {
  WalletContainer,
  WalletDealerCoins,
  WalletDealerName,
  WalletPlayerCoins,
  WalletPlayerName,
  WalletWrapper,
} from "../components/Wallets";

let cardState = [];
let dealerCard;
let playerCard1;
let playerCard2;
let deck = [];

export function BlackJack() {
  const [cardPlayerImages, setCardPlayerImages] = useState([]);
  const [cardDealerImages, setCardDealerImages] = useState([]);
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
    bet: 100,
    userName: "",
    isModalVisible: false,
  });

  let playerSum = 0;
  let dealerAceCount = 0;
  let playerAceCount = 0;

  function buildDeck() {
    cardState = [];
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

    //FIRST DEALER CARD
    dealerCard = cardState.pop();
    dealerSum += getValue(dealerCard);
    dealerAceCount += checkAce(dealerCard);
    setCardDealerImages((prevValue) => [...prevValue, dealerCard]);

    //FIRST PLAYER CARD
    for (let index = 0; index < 1; index++) {
      playerCard1 = cardState.pop();

      playerSum += getValue(playerCard1);
      playerAceCount += checkAce(playerCard1);
      deck.push(playerCard1);
      setCardPlayerImages((prev) => [...prev, playerCard1]);

      playerCard2 = cardState.pop();

      playerSum += getValue(playerCard2);
      playerAceCount += checkAce(playerCard2);
      deck.push(playerCard2);
      setCardPlayerImages((prev) => [...prev, playerCard2]);
    }

    setGameState((prev) => ({
      ...prev,
      playerSum,
      playerAceCount,
      dealerSum,
      dealerAceCount,
      canStay: true,
      canHit: true,
      dealerWallet: Number(dealerWallet),
      playerWallet: Number(playerWallet),
      betQuantity: 100,
      playerWon: false,
      dealerWon: false,
      bet: 50,
      isPlayer: false,
      isDealer: false,
      isDraw: false,
      userName: playerName,
      isModalVisible: false,
    }));
  }

  function hit() {
    if (!gameState.bet) {
      return alert("Please make your BET before to HIT!");
    }
    if (!gameState.canHit) {
      return;
    }

    const playerCard = cardState.pop();

    setCardPlayerImages((prev) => [...prev, playerCard]);

    playerSum += getValue(playerCard);
    playerAceCount += checkAce(playerCard);

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
    if (!gameState.bet) {
      return alert("Please make your BET before to STAY!");
    }

    dealerCard = cardState.pop();

    setCardDealerImages((prevValue) => [...prevValue, dealerCard]);

    dealerSum += getValue(dealerCard);
    dealerAceCount += checkAce(dealerCard);

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
    if (
      gameState.dealerSum > 17 &&
      gameState.dealerSum < 21 &&
      gameState.dealerSum < gameState.playerSum
    ) {
      return setGameState((prevState) => ({
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
      return setGameState((prevState) => ({
        ...prevState,
        dealerWon: true,
        playerWon: false,
        canHit: false,
        canStay: false,
      }));
    }

    if (gameState.playerSum === gameState.dealerSum && playerSum !== 0) {
      return setGameState((prevValue) => ({
        ...prevValue,
        isDraw: true,
        playerWon: false,
        dealerWon: false,
        canStay: false,
      }));
    }
  }

  useEffect(() => {
    checkDealerValue();
  }, [cardDealerImages.length]);

  function handleApplyBet() {
    if (gameState.betQuantity > gameState.playerWallet) {
      alert(
        "You do not have enough money in your wallet, try to make a smaller BET or start a new game!"
      );
    } else if (gameState.betQuantity < 1) {
      alert("Your bet should be higher than $0 !");
    } else if (gameState.dealerWallet < gameState.betQuantity) {
      alert("Dealer do not has enough money, make a smaller bet please !");
    } else {
      setGameState((prevValue) => ({
        ...prevValue,
        bet: gameState.betQuantity,
      }));
    }
  }

  function handleBet(value) {
    setGameState((prevValue) => ({
      ...prevValue,
      betQuantity: value,
    }));
  }

  // WINNER CHECK

  useEffect(() => {
    const playerWallet = localStorage.getItem("playerWallet");
    const dealerWallet = localStorage.getItem("dealerWallet");
    if (
      gameState.dealerSum === 21 ||
      gameState.dealerWon ||
      gameState.playerSum > 21
    ) {
      console.log("true");
      const newWalletPlayerValue =
        parseInt(playerWallet) - parseInt(gameState.bet);
      const newWalletDealerValue =
        parseInt(dealerWallet) + parseInt(gameState.bet);

      localStorage.setItem("playerWallet", newWalletPlayerValue);
      localStorage.setItem("dealerWallet", newWalletDealerValue);

      return setGameState((prevValue) => ({
        ...prevValue,
        playerWallet: Number(newWalletPlayerValue),
        dealerWallet: Number(newWalletDealerValue),
        isDealer: true,
        canStay: false,
        canHit: false,
      }));
    }

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
      console.log("true"); //here
      return setGameState((prevValue) => ({
        ...prevValue,
        playerWallet: Number(newWalletPlayerValue),
        dealerWallet: Number(newWalletDealerValue),
        isPlayer: true,
        canStay: false,
        canHit: false,
      }));
    }
  }, [playerSum, dealerSum, cardDealerImages.length, cardPlayerImages.length]);

  console.log("game stae", gameState);

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

    if (userName) {
      return userName;
    } else {
      return "";
    }
  }

  useEffect(() => {
    isUserStartedGame();

    setGameState((prevState) => ({
      ...prevState,
      isModalVisible: true,
    }));
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
        canContinue={isUserStartedGame()}
        nextGame={nextGame}
        playerCards={cardPlayerImages.length}
      />
      <TableWrapper>
        <SpaceBetweenGame>
          <DealerWrapper>
            {cardDealerImages.length > 0 ? (
              <>
                <Text type="dealer" size={32}>
                  Dealer
                </Text>
                <Spacer margin={30} />
              </>
            ) : (
              <Text size={25} type="player">
                Welcome to Blackjack
              </Text>
            )}

            {cardDealerImages.length === 1 && (
              <IMG type="cards" src={cards.back} alt="card" />
            )}

            {cardDealerImages.map((data, index) => {
              return (
                <IMG type="cards" src={cards[data]} alt="card" key={index} />
              );
            })}
          </DealerWrapper>

          <BetContainer>
            <div>
              <ImageWrapper>
                <IMG type="chips" src={cards.chips} alt="chips" />
                <BetValueWrapper>
                  <Text size={12} align="left" type="player">
                    $ {""}
                    {gameState.bet.length > 4
                      ? gameState.bet.substring(0, 3) + "..."
                      : gameState.bet}
                  </Text>
                </BetValueWrapper>
              </ImageWrapper>
            </div>
            <Input
              type="number"
              title="bet"
              value={gameState.betQuantity}
              onChange={(e) => handleBet(e.target.value)}
            />

            <Button
              isBet
              xSize={100}
              ySize={44.4}
              title="Raise"
              onClick={handleApplyBet}
              bgColor={colors.white}
              textColor={!gameState.bet ? colors.red : colors.green}
            >
              {!gameState.bet ? "Raise" : "Raise"}
            </Button>
          </BetContainer>

          <WalletsWrapper>
            <WalletContainer>
              <WalletWrapper>
                <WalletDealerName>
                  <Text type="walletName">Dealer's chips:</Text>
                </WalletDealerName>
                <WalletDealerCoins>
                  <Text size={17} type="walletChips" textColor={colors.white}>
                    $ {""}
                    {gameState.dealerWallet.length > 6
                      ? gameState.dealerWallet.substring(0, 6) + "..."
                      : gameState.dealerWallet}
                  </Text>
                </WalletDealerCoins>
              </WalletWrapper>

              <WalletWrapper>
                <WalletPlayerName>
                  <Text type="walletName" textColor={colors.green}>
                    {getUserName().length > 8
                      ? getUserName().substring(0, 7) + `'s` + "..."
                      : getUserName() + `'s`}{" "}
                    chips:
                  </Text>
                </WalletPlayerName>
                <WalletPlayerCoins>
                  <Text size={17} type="walletChips" textColor={colors.white}>
                    $ {""}
                    {gameState.playerWallet.length > 6
                      ? gameState.playerWallet.substring(0, 6) + "..."
                      : gameState.playerWallet}
                  </Text>
                </WalletPlayerCoins>
              </WalletWrapper>
            </WalletContainer>
          </WalletsWrapper>

          <PlayerWrapper>
            {cardPlayerImages.length > 0 && (
              <Text size={25} type="player">
                {getUserName()}
              </Text>
            )}
            <Spacer margin={32} />

            <CardsWrapper>
              {gameState.isPlayer && (
                <>
                  <Text size={18} type="won">
                    {gameState.dealerWallet < 1
                      ? "You Won all dealer's money Congrats!"
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
                      ? "Game over, you lost all your money!"
                      : "You lost!"}
                  </Text>
                  <Spacer />
                </>
              )}
              {gameState.dealerWon && (
                <>
                  <Text size={18} type={"lost"}>
                    {gameState.playerWallet < 1
                      ? "Game over, you lost all your money!"
                      : "Dealer Won!"}
                  </Text>
                  <Spacer />
                </>
              )}

              {cardPlayerImages.map((data, index) => {
                return (
                  <IMG type="cards" src={cards[data]} alt="card" key={index} />
                );
              })}
            </CardsWrapper>

            <Spacer margin={76} />

            <SpaceBetween>
              {cardPlayerImages.length > 0 && (
                <>
                  {gameState.canHit && (
                    <Button
                      title="Hit"
                      textColor={colors.green}
                      onClick={hit}
                      marginR={16}
                    >
                      Hit
                    </Button>
                  )}
                  {gameState.canStay && (
                    <Button
                      title="Stay"
                      textColor={colors.green}
                      onClick={stay}
                      marginR={24}
                    >
                      Stay
                    </Button>
                  )}
                </>
              )}

              {isUserStartedGame() && (
                <Button
                  title="Next game"
                  marginL={gameState.canStay && 24}
                  onClick={nextGame}
                  textColor={colors.green}
                >
                  {cardPlayerImages.length < 1 ? "Continue" : "Next game"}
                </Button>
              )}
              <Button
                title="New game"
                marginL={16}
                textColor={colors.white}
                onClick={createNewGame}
                bgColor={colors.red}
              >
                New game
              </Button>
            </SpaceBetween>
          </PlayerWrapper>
        </SpaceBetweenGame>
      </TableWrapper>
    </Container>
  );
}
