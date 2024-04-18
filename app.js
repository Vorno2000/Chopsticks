const game = () => {
  let pScore = 0;
  let cScore = 0;

  const startGame = () => {
    const introScreen = document.querySelector(".intro");

    const instructionsBtn = document.querySelector(".instructionsBtn");
    const startGameBtn = document.querySelector(".startGameBtn");

    const instructionsScreen = document.querySelector(".instructions");

    const okBtn = document.querySelector(".instructionsOkBtn");

    instructionsBtn.addEventListener("click", function () {
      introScreen.classList.remove("fadeIn");
      introScreen.classList.add("fadeOut");
      instructionsScreen.classList.remove("fadeOut");
      instructionsScreen.classList.add("fadeIn");
    });

    startGameBtn.addEventListener("click", function () {
      introScreen.classList.remove("fadeIn");
      introScreen.classList.add("fadeOut");

      match();
    });

    okBtn.addEventListener("click", function () {
      instructionsScreen.classList.remove("fadeIn");
      instructionsScreen.classList.add("fadeOut");
      introScreen.classList.remove("fadeOut");
      introScreen.classList.add("fadeIn");
    });
  };

  const match = () => {
    const matchScreen = document.querySelector(".match");

    matchScreen.classList.remove("fadeOut");
    matchScreen.classList.add("fadeIn");

    const pLeftHand = document.querySelector(".pLeftHand");
    const pRightHand = document.querySelector(".pRightHand");
    const cLeftHand = document.querySelector(".cLeftHand");
    const cRightHand = document.querySelector(".cRightHand");

    let selectionMade = false;

    let fromHand, toHand;
    let cFromHand, cToHand;

    //------------  Left Hand  ----------------

    pLeftHand.addEventListener("click", function () {
      //no hand has been selected
      if (!selectionMade) {
        if (pLeftHand.getAttribute("value") != 0) {
          fromHand = this;
          selectionMade = true;
          fromHand.style.animation = "pLeft 2s infinite";
        } else {
          pRightHand.style.animation = "notify 1.15s 1";
        }
      }
      // trying to add to own hand
      else if (fromHand != this) {
        if (fromHand.parentElement.className === "player-hands") {
          toHand = this;
          addToOwnHand();
        }
      }
      //press same hand again - unselect hand
      else {
        fromHand.style.animation = "";
        selectionMade = false;
        fromHand = undefined;
      }
    });

    //------------  Right Hand  ----------------

    pRightHand.addEventListener("click", function () {
      //no hand has been selected
      if (!selectionMade) {
        if (pRightHand.getAttribute("value") != 0) {
          fromHand = this;
          selectionMade = true;
          fromHand.style.animation = "pRight 2s infinite";
        } else {
          pLeftHand.style.animation = "notify 1.15s 1";
        }
      }
      // trying to add to own hand
      else if (fromHand != this) {
        if (fromHand.parentElement.className === "player-hands") {
          toHand = this;
          addToOwnHand();
        }
      }
      //press same hand again - unselect hand
      else {
        fromHand.style.animation = "";
        selectionMade = false;
        fromHand = undefined;
      }
    });

    //------------  Right Hand Computer  ----------------

    cRightHand.addEventListener("click", function () {
      //no hand has been selected
      if (!selectionMade) {
        pLeftHand.style.animation = "notify 1.15s 1";
        pRightHand.style.animation = "notify 1.15s 1";
      }
      //trying to add to this computer hand
      else if (fromHand != this) {
        if (fromHand.parentElement.className === "player-hands") {
          toHand = this;
          let newValue = calculatePoints(fromHand, toHand);

          setTimeout(() => {
            this.src = `./assets/${newValue}.png`;
            this.setAttribute("value", newValue);
            if (!winCheck()) {
              setTimeout(() => {
                opponentsTurn();
              }, 1000);
            }
          }, 1000);

          fromHand.style.animation = "playerAttack 1.15s 1";
          this.style.animation = "playerAttack 1.15s 1";

          selectionMade = false;
          fromHand = undefined;
        }
      }
    });

    //------------  Left Hand Computer  ----------------

    cLeftHand.addEventListener("click", function () {
      //no hand has been selected
      if (!selectionMade) {
        pLeftHand.style.animation = "notify 1.15s 1";
        pRightHand.style.animation = "notify 1.15s 1";
      }
      //trying to add to this computer hand
      else if (fromHand != this) {
        if (fromHand.parentElement.className === "player-hands") {
          toHand = this;
          let newValue = calculatePoints(fromHand, toHand);

          setTimeout(() => {
            this.src = `./assets/${newValue}.png`;
            this.setAttribute("value", newValue);
            if (!winCheck()) {
              setTimeout(() => {
                opponentsTurn();
              }, 1000);
            }
          }, 1000);

          fromHand.style.animation = "playerAttack 1.15s 1";
          this.style.animation = "playerAttack 1.15s 1";

          selectionMade = false;
          fromHand = undefined;
          toHand = undefined;
        }
      }
    });

    pLeftHand.addEventListener("animationend", function () {
      this.style.animation = "";
    });
    pRightHand.addEventListener("animationend", function () {
      this.style.animation = "";
    });
    cLeftHand.addEventListener("animationend", function () {
      this.style.animation = "";
    });
    cRightHand.addEventListener("animationend", function () {
      this.style.animation = "";
    });

    let setup = false;

    const addToOwnHand = () => {
      if (fromHand.parentElement.className === toHand.parentElement.className) {
        if (fromHand.parentElement.className === "player-hands") {
          fromHand.style.animation = "";
          const selfAddWindow = document.querySelector(".selfAdd");
          const matchScreen = document.querySelector(".match");

          matchScreen.classList.add("unfocus");
          selfAddWindow.classList.remove("fadeOut");
          selfAddWindow.classList.add("fadeIn");

          const selfAddInput = document.getElementById("selfAddInput");
          const selfAddUpArrow = document.querySelector(".upArrow");
          const selfAddDownArrow = document.querySelector(".downArrow");
          const selfAddOkBtn = document.querySelector(".selfAddOkBtn");
          const cancelBtn = document.querySelector(".cancelBtn");

          selfAddInput.setAttribute("value", 0);

          if (!setup) {
            selfAddUpArrow.addEventListener("click", function () {
              if (
                selfAddInput.getAttribute("value") <
                fromHand.getAttribute("value")
              ) {
                let combined =
                  Number(selfAddInput.getAttribute("value")) +
                  Number(toHand.getAttribute("value"));

                if (combined < 5) {
                  selfAddInput.setAttribute(
                    "value",
                    Number(selfAddInput.getAttribute("value")) + 1
                  );
                }

                fromHand.src = `./assets/${
                  Number(fromHand.getAttribute("value")) -
                  Number(selfAddInput.getAttribute("value"))
                }.png`;

                toHand.src = `./assets/${calculatePoints(
                  Number(toHand.getAttribute("value")),
                  Number(selfAddInput.getAttribute("value"))
                )}.png`;
              }
            });

            selfAddDownArrow.addEventListener("click", function () {
              if (selfAddInput.getAttribute("value") > 0) {
                selfAddInput.setAttribute(
                  "value",
                  Number(selfAddInput.getAttribute("value")) - 1
                );
              }
              fromHand.src = `./assets/${
                Number(fromHand.getAttribute("value")) -
                Number(selfAddInput.getAttribute("value"))
              }.png`;

              toHand.src = `./assets/${calculatePoints(
                Number(toHand.getAttribute("value")),
                Number(selfAddInput.getAttribute("value"))
              )}.png`;
            });

            selfAddOkBtn.addEventListener("click", function () {
              if (selfAddInput.getAttribute("value") === 0) {
                matchScreen.classList.remove("unfocus");
                matchScreen.classList.add("focus");
                selfAddWindow.classList.remove("fadeIn");
                selfAddWindow.classList.add("fadeOut");

                selfAddInput.setAttribute("value", 0);
                return;
              } else {
                toHand.setAttribute(
                  "value",
                  calculatePoints(selfAddInput, toHand)
                );
                fromHand.setAttribute(
                  "value",
                  Number(fromHand.getAttribute("value")) -
                    Number(selfAddInput.getAttribute("value"))
                );

                setTimeout(() => {
                  toHand.src = `./assets/${toHand.getAttribute("value")}.png`;
                  fromHand.src = `./assets/${fromHand.getAttribute(
                    "value"
                  )}.png`;

                  selectionMade = false;
                  fromHand = undefined;
                  toHand = undefined;

                  if (!winCheck()) {
                    setTimeout(() => {
                      opponentsTurn();
                    }, 1000);
                  }
                }, 1000);

                fromHand.style.animation = "playerAttack 1.15s 1";
                toHand.style.animation = "playerAttack 1.15s 1";

                matchScreen.classList.remove("unfocus");
                matchScreen.classList.add("focus");
                selfAddWindow.classList.remove("fadeIn");
                selfAddWindow.classList.add("fadeOut");

                selfAddInput.setAttribute("value", 0);
              }
            });

            cancelBtn.addEventListener("click", function () {
              fromHand.src = `./assets/${Number(
                fromHand.getAttribute("value")
              )}.png`;

              toHand.src = `./assets/${Number(
                toHand.getAttribute("value")
              )}.png`;

              matchScreen.classList.remove("unfocus");
              matchScreen.classList.add("focus");
              selfAddWindow.classList.remove("fadeIn");
              selfAddWindow.classList.add("fadeOut");

              selfAddInput.setAttribute("value", 0);

              fromHand.style.animation = "";
              toHand.style.animation = "";

              selectionMade = false;
              fromHand = undefined;
              toHand = undefined;

              return;
            });
            setup = true;
          }
          return;
        }
      }
      return;
    };

    const opponentsTurn = () => {
      //choose hand from
      if (cLeftHand.getAttribute("value") != 0) {
        if (cRightHand.getAttribute("value") != 0) {
          let choice = Math.floor(Math.random() * 2);
          if (choice === 0) cFromHand = cLeftHand;
          else cFromHand = cRightHand;
        } else cFromHand = cLeftHand;
      } else cFromHand = cRightHand;

      //choose hand to
      let toHandSelection = [pLeftHand, pRightHand, cLeftHand, cRightHand];

      toHandSelection.splice(toHandSelection.indexOf(cFromHand), 1);

      if (cFromHand === cLeftHand) {
        if (Number(cRightHand.getAttribute("value")) > 3)
          toHandSelection.splice(toHandSelection.indexOf(cRightHand), 1);
      } else {
        if (Number(cLeftHand.getAttribute("value")) > 3)
          toHandSelection.splice(toHandSelection.indexOf(cLeftHand), 1);
      }

      if (Number(pLeftHand.getAttribute("value")) === 0)
        toHandSelection.splice(toHandSelection.indexOf(pLeftHand), 1);

      if (Number(pRightHand.getAttribute("value")) === 0)
        toHandSelection.splice(toHandSelection.indexOf(pRightHand), 1);

      cToHand =
        toHandSelection[Math.floor(Math.random() * toHandSelection.length)];

      opponentPlay();
    };

    const opponentPlay = () => {
      let cNewValue, transferAmount;
      if (
        cFromHand.parentElement.className === "computer-hands" &&
        cToHand.parentElement.className === "computer-hands"
      ) {
        //adding to eachother
        transferAmount = 4 - cToHand.getAttribute("value");

        if (transferAmount - Number(cFromHand.getAttribute("value")) > 0) {
          //use from hand fingers
          transferAmount = Number(cFromHand.getAttribute("value"));
        }

        if (transferAmount > 1)
          transferAmount = Math.floor(Math.random() * transferAmount) + 1;

        cNewValue = calculatePoints(
          transferAmount,
          Number(cToHand.getAttribute("value"))
        );
      } else {
        cNewValue = calculatePoints(cFromHand, cToHand);
        transferAmount = 0;
      }

      setTimeout(() => {
        cFromHand.setAttribute(
          "value",
          Number(cFromHand.getAttribute("value")) - transferAmount
        );
        cToHand.setAttribute("value", cNewValue);

        cFromHand.src = `./assets/${Number(
          cFromHand.getAttribute("value")
        )}.png`;
        cToHand.src = `./assets/${cNewValue}.png`;

        cFromHand = undefined;
        cToHand = undefined;

        winCheck();
      }, 1000);

      cFromHand.style.animation = "computerAttack 1.15s 1";
      cToHand.style.animation = "computerAttack 1.15s 1";
    };

    const end = document.querySelector(".end");

    const winCheck = () => {
      const winnerText = document.querySelector(".winnerText");

      if (
        Number(pLeftHand.getAttribute("value")) === 0 &&
        Number(pRightHand.getAttribute("value")) === 0
      ) {
        //computer wins
        winnerText.textContent = `Computer Wins!`;

        matchScreen.classList.remove("fadeIn");
        matchScreen.classList.add("fadeOut");
        end.classList.remove("fadeOut");
        end.classList.add("fadeIn");
        cScore += 1;
        return true;
      }
      if (
        Number(cLeftHand.getAttribute("value")) === 0 &&
        Number(cRightHand.getAttribute("value")) === 0
      ) {
        //player wins
        winnerText.textContent = `Player Wins!`;

        matchScreen.classList.remove("fadeIn");
        matchScreen.classList.add("fadeOut");
        end.classList.remove("fadeOut");
        end.classList.add("fadeIn");
        pScore += 1;
        return true;
      }
    };
    const playAgainBtn = document.querySelector(".playAgainBtn");

    playAgainBtn.addEventListener("click", function () {
      matchScreen.classList.remove("fadeOut");
      matchScreen.classList.add("fadeIn");
      end.classList.remove("fadeIn");
      end.classList.add("fadeOut");

      pLeftHand.setAttribute("value", 1);
      pRightHand.setAttribute("value", 1);
      cLeftHand.setAttribute("value", 1);
      cRightHand.setAttribute("value", 1);

      pLeftHand.src = `./assets/${pLeftHand.getAttribute("value")}.png`;
      pRightHand.src = `./assets/${pRightHand.getAttribute("value")}.png`;
      cLeftHand.src = `./assets/${cLeftHand.getAttribute("value")}.png`;
      cRightHand.src = `./assets/${cRightHand.getAttribute("value")}.png`;

      const playerScore = document.querySelector(".player-score p");
      const computerScore = document.querySelector(".computer-score p");

      playerScore.textContent = pScore;
      computerScore.textContent = cScore;
    });
  };

  const calculatePoints = (fromHand, toHand) => {
    let newValue;
    if (typeof fromHand === "object") {
      newValue =
        Number(fromHand.getAttribute("value")) +
        Number(toHand.getAttribute("value"));
    } else if (typeof fromHand === "number") {
      newValue = fromHand + toHand;
    }

    if (newValue > 4) newValue -= 5;

    return newValue;
  };

  startGame();
};

game();
