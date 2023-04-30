import React, { useEffect, useState } from "react";
import {
  Container,
  DealerWrapper,
  PlayerWrapper,
  IMG,
  Button,
  SpaceBetweenGame,
  SpaceBetweenButtons,
} from "./BlackJack.style";
import { cards } from "../assets/images";

export function BlackJack() {
  const [cardPlayerImages, setCardPlayerImages] = useState([]);
  const [cardDealerImages, setCardDealerImages] = useState([]);
  const [cardState, setCardState] = useState([]);
  const [gameState, setGameState] = useState({
    dealerSum: 0,
    playerSum: 0,
    canHit: true,
    dealerAceCount: 0,
    playerAceCount: 0,
    canStay: true,
    dealerWon: false,
    playerWon: false,
    dealerWallet: 1000,
    playerWallet: 1000,
    betQuantity: 100,
    bet: 0,
  });

  let playerSum = 0;

  let dealerAceCount = 0;
  let playerAceCount = 0;

  let newCard;
  let deck = [];

  // TO DO all variables states in useState

  function buildDeck() {
    let cardValues = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
    let cardTypes = ["C", "D", "H", "S"];

    for (let indexTypes = 0; indexTypes < cardTypes.length; indexTypes++) {
      //types
      for (let valueIndex = 0; valueIndex < cardValues.length; valueIndex++) {
        cardState.push(cardValues[valueIndex] + "-" + cardTypes[indexTypes]);
      }
    }
  }

  function mixCards() {
    for (let indexCards = 0; indexCards < cardState.length; indexCards++) {
      let randomNumbers = Math.floor(Math.random() * cardState.length); // multiplying 1 * deck length which is 56

      let initialDeck = cardState[indexCards];

      cardState[indexCards] = cardState[randomNumbers];

      cardState[randomNumbers] = initialDeck;
    }
  }

  function getValue(newCard) {
    let data = newCard.split("-");
    let value = data[0];

    if (isNaN(value)) {
      //if data is not a number do that

      if (value === "A") {
        return 11; //only A has 11 the rest 10
      }
      return 10;
    }

    return parseInt(value); //if the data is number return it integer
  }

  let dealerSum = 0;

  function startGame() {
    const dealerWallet = localStorage.getItem("dealerWallet");
    const playerWallet = localStorage.getItem("playerWallet");

    if (!dealerWallet || dealerWallet < 1) {
      localStorage.setItem("dealerWallet", 1000);
      localStorage.setItem("playerWallet", 1000);
    }

    if (!playerWallet || playerWallet < 1) {
      localStorage.setItem("dealerWallet", 1000);
      localStorage.setItem("playerWallet", 1000);
    }

    //dealer will take a card
    newCard = cardState.pop();
    dealerSum += getValue(newCard);
    dealerAceCount += checkAce(newCard);
    setCardDealerImages((prevValue) => [...prevValue, newCard]);

    // dealer
    //     while (dealerSum < 17) {
    //       const card = cardState.pop();
    //
    //       dealerSum += getValue(card);
    //
    //       dealerAceCount += checkAce(card);
    //
    //
    //     }

    // player will take a card
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
    }));
  }

  function hit() {
    if (!gameState.canHit) {
      return;
    }

    const card = cardState.pop();

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

  //on stay dealer has to show his second card.
  function stay() {
    //dealer will take a card
    newCard = cardState.pop();

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

    // RULES::::::
    //if hand is higher than 21 its called bust(i lost)and dealer gets my bet
    //on start everyone besides the dealer places a bet , then a dealer face up a card to
    //  each player/ one card to the dealer faces up
    //The second card of dealer's is faced down.
    // if you want another card chose HIT
    //if i do not want other cards (STAY)
    //After that dealer have to show his second card/ if in his hand
    //  cards are lower than 16 he have to take another card.
  }

  useEffect(() => {
    checkDealerValue();
  }, [cardDealerImages.length]);

  function reduceAce(playerSum, playerAceCount) {
    if (playerSum > 21 && playerAceCount > 0) {
      setGameState((prev) => ({
        ...prev,
        playerAceCount: playerAceCount - 1,
        playerSum: playerSum - 10,
      }));
    }

    return gameState.playerSum;
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
    }
  }

  function handleApplyBet() {
    //  const dealerWallet = localStorage.getItem("dealerWallet");

    setGameState((prevValue) => ({
      ...prevValue,
      bet: gameState.betQuantity,
    }));
  }

  useEffect(() => {
    if (
      gameState.dealerSum === 21 ||
      gameState.dealerWon ||
      gameState.playerSum > 21
    ) {
      console.log("dealer won");
      const playerWallet = localStorage.getItem("playerWallet");
      const dealerWallet = localStorage.getItem("dealerWallet");

      const newWalletPlayerValue =
        parseInt(playerWallet) - Number(gameState.bet);
      const newWalletDealerValue =
        parseInt(dealerWallet) + Number(gameState.bet);

      localStorage.setItem("playerWallet", newWalletPlayerValue);
      localStorage.setItem("dealerWallet", newWalletDealerValue);
    }

    if (
      gameState.playerSum === 21 ||
      gameState.playerWon ||
      gameState.dealerSum > 21
    ) {
      console.log("=>>>>>>>>>>>>>", gameState.bet);
      const playerWallet = localStorage.getItem("playerWallet");
      const dealerWallet = localStorage.getItem("dealerWallet");

      const newWalletPlayerValue =
        parseInt(playerWallet) + Number(gameState.bet);
      const newWalletDealerValue =
        parseInt(dealerWallet) - Number(gameState.bet);

      localStorage.setItem("playerWallet", newWalletPlayerValue);
      localStorage.setItem("dealerWallet", newWalletDealerValue);
    }
  }, [
    gameState.dealerSum,
    gameState.playerSum,
    gameState.dealerWon,
    gameState.playerWon,
  ]);

  function newGame() {
    setGameState({
      dealerSum: 0,
      playerSum: 0,
      canHit: true,
      dealerAceCount: 0,
      playerAceCount: 0,
    });
    setCardPlayerImages([]);
    setCardDealerImages([]);
    buildDeck();
    mixCards();
    startGame();
  }

  return (
    <Container>
      <SpaceBetweenGame>
        <DealerWrapper>
          <h4 style={{ textAlign: "right" }}>
            Wallet: {gameState.dealerWallet}$
          </h4>{" "}
          <h2>Dealer:</h2>
          {gameState.dealerSum === 21 && <h3>Dealer Won!</h3>}{" "}
          {gameState.dealerWon && <h3>Dealer Won!</h3>}
          {cardDealerImages.length === 1 && <IMG src={cards.back} alt="card" />}
          {cardDealerImages.map((data, index) => {
            return <IMG src={cards[data]} alt="card" key={index} />;
          })}
        </DealerWrapper>
        <div style={{ position: "absolute", marginTop: -25, left: 550 }}>
          <h1>Bet:{gameState.bet}$</h1>
          <input
            style={{ width: 80 }}
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

          <button title="apply" onClick={handleApplyBet}>
            Apply
          </button>
        </div>

        <PlayerWrapper>
          <div>
            <h4 style={{ textAlign: "right" }}>
              Wallet: {gameState.playerWallet}$
            </h4>{" "}
            <h2>Player:</h2> {gameState.playerSum === 21 && <h3>You Won!</h3>}
            {gameState.playerWon && <h3>You Won!</h3>}
            {gameState.playerSum > 21 && <h3>You lost!</h3>}
            {gameState.dealerSum > 21 && <h3>You Won!</h3>}
            {cardPlayerImages.map((data, index) => {
              return <IMG src={cards[data]} alt="card" key={index} />;
            })}
          </div>

          <div>
            <SpaceBetweenButtons>
              {cardPlayerImages.length > 0 && (
                <>
                  {gameState.canHit && <Button onClick={hit}>Hit</Button>}
                  {gameState.canStay && <Button onClick={stay}>Stay</Button>}
                </>
              )}
              <Button onClick={newGame}>New game</Button>
            </SpaceBetweenButtons>
          </div>
        </PlayerWrapper>
      </SpaceBetweenGame>
    </Container>
  );
}
