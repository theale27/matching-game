const gameboard = document.getElementById("game-board");
const card = gameboard.querySelectorAll(".card");

let moves = 0;
moveCounter = () => {
  moves++;
  document.getElementById("moves").innerHTML = "Moves: " + moves;
};

//* TIMER
let seconds,
  minutes,
  totalSeconds = null;
setTime = () => {
  if (moves > 0) {
    totalSeconds++;
    seconds = pad(totalSeconds % 60);
    minutes = pad(parseInt(totalSeconds / 60));
    document.getElementById("timer").innerHTML = minutes + ":" + seconds;
  }
};
function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}
let elapsedTime = setInterval(setTime, 1000);

let selectedCardArray = [];
let cardArray = [
  "pikachu",
  "squirtle",
  "charmander",
  "bulbasaur",
  "eevee",
  "pokeball",
  "greatball",
  "ultraball"
];

// Removes card from array that matches the selected pairs
checkCard = (cardAttribute, i) => {
  if (cardAttribute === selectedCardArray[0]) {
    cardArray.splice(i, 1);
    selectedCardArray = [];
  }
};

//Loops through and adds click function to each div
card.forEach((cardClick, i) => {
  cardClick.addEventListener("click", function(e) {
    // Rotates the card and makes the image visible
    let currentCard = e.srcElement.querySelectorAll("img")[0];
    e.srcElement.classList.add("card_rotate");
    console.log("e.srcElement", e.srcElement);

    setTimeout(function() {
      currentCard.classList.add("image_reveal");
      selectedCardArray.push(currentCard.getAttribute("alt"));
      e.srcElement.classList.remove("card_rotate");

      // Stop timer if all pairs have been found
      if (cardArray.length === 1) {
        clearInterval(elapsedTime);
      } else if (selectedCardArray.length === 2) {
        //Checks if attributes match
        if (selectedCardArray[0] === selectedCardArray[1]) {
          console.log("You found a match!");
          cardArray.filter(checkCard);
        } else {
          console.log("These cards dont match", selectedCardArray);
          setTimeout(function() {
            // Loops through all cards to find matching card then makes them hidden again
            card.forEach((cardSearch, index) => {
              // Get attribute to compare
              let cardVisible = cardSearch
                .querySelectorAll("img")[0]
                .classList.contains("image_reveal");
              let cardAttribute = cardSearch
                .querySelectorAll("img")[0]
                .getAttribute("alt");

              if (
                (cardAttribute === selectedCardArray[0] ||
                  cardAttribute === selectedCardArray[1]) &&
                cardVisible
              ) {
                cardSearch.classList.add("card_rotate");
                setTimeout(function() {
                  cardSearch
                    .querySelectorAll("img")[0]
                    .classList.remove("image_reveal");
                  cardSearch.classList.remove("card_rotate");
                }, 100);
              }
            });
            selectedCardArray = [];
          }, 500);
        }
      }
      moveCounter();
    }, 100);
  });
});

//TODO: Randomise where the images are placed
//!!! Save my settings with that extension
