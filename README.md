# Coral Match

Coral Match is an educational version of the well known card matching game. The purpose is to help users in learning about different types of saltwater corals, invertebrates, and fish through a fun, interactive and challenging game. One card will have a photo of the saltwater animal and while the other will have a brief description and a name. The user will flip cards arranged on the screen looking for pairs of matching images and must find all pairs in a specified amount of time. Once a pair has been found the cards will remain flipped. After all pairs have been found the user will be able to play the next level with different animals.

## Functionality & MVP
Users will be able to:
- [ ] Play two levels
- [ ] Flip cards and search for pairs
- [ ] 

In addition, this project will include:
- [ ] Shuffle cards if time is up and reset
- [ ] A modal with instructions
- [ ] A production Readme

## Wireframe
Coral Match will consists of a single screen with the board, cards, title, timer and modal.

[wireframe]: Wireframe.png "Wireframe"
![alt_text][wireframe]

## Architecture and Technologies
This project will be implemented with the following technologies:
- Vanilla Javascript, `jquery`, and React for overall structure and game logic
- Easel.js, and Move.js for DOM manipulation and rendering
- Webpack to bundle and serve up the various scripts

In addition to the webpack entry file, there will be four additional script files.

`board.js`: this script will handle the logic for placing the cards and creating the board with the necessary card pairs as well as rendering them on the DOM.

`card.js`: this script will handle creating the card pairs.

`movements.js`: this script will handle the movement actions for the cards and the shuffling of the board.

`timer.js`: this script will handle the timer DOM element.

## Implementation Timeline

**Day 1:** Setup all necessary Node modules, including getting webpack up and running and `Easel.js` installed. Create webpack.config.js as well as package.json. Write a basic entry file and the bare bones of all 3 scripts outlined above. Learn the basics of `Easel.js`. Goals for the day:

Get a green bundle with webpack
Learn enough Easel.js to render an object to the Canvas element.

**Day 2:** Create the cards and have them render on the screen.  Add movement to the cards as well as timer element.

**Day 3:** Add logic to allow for pairs to be matched, and transition styling.

**Day 4:** Add level 2 with appropriate styling.
