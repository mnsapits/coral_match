import React, { Component } from 'react';
import Card from './Card';
import './Game.css';
import shuffle from 'lodash/shuffle';
var Modal = require('react-modal');

import anemoneImg from './images/anemone.jpg';
import clownfishImg from './images/clownfish.jpg';
import mushroomImg from './images/mushroom.jpg';
import seahorseImg from './images/seahorse.jpg';
import shrimpImg from './images/shrimp.jpg';
import starfishImg from './images/starfish.jpg';
import tangImg from './images/tang.jpg';
import urchinImg from './images/urchin.jpg';

const DECK1 = [
  ['Anemone', anemoneImg],
  ['Clownfish', clownfishImg],
  ['Mushroom Coral', mushroomImg],
  ['Seahorse', seahorseImg]
];

const DECK2 = [
  ['Cleaner Shrimp', shrimpImg],
  ['Starfish', starfishImg],
  ['Blue Hippo Tang', tangImg],
  ['Sea Urchin', urchinImg]
];

class Game extends Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
      cards: shuffle(this.cards(DECK1)),
      lastCard: null,
      matches: 0,
      clicks: 0
    };
  }

  cards(deck) {
    let result = [];
    deck.forEach((pair, i) => {
      pair.forEach((cardVal, j) => {
        if(j === 0){
          result.push(<Card
            matchId={i}
            type='text'
            value={cardVal}
            key={cardVal}
            matchCheck={this.matchCheck.bind(this)}
            />
        );
      } else {
        result.push(<Card
          matchId={i}
          type='url'
          value={cardVal}
          key={cardVal}
          matchCheck={this.matchCheck.bind(this)}
          />
        );
      }
    });
  });
    return result;
  }

  matchCheck(clickedCard) {
    if (clickedCard.state.flipped) {
      return;
    } else {
      clickedCard.setState({flipped: true});
    }
    let lastCard = this.state.lastCard;

    let clickCount = this.state.clicks;
    if (lastCard) {
      this.setState({clicks: clickCount + 1});
      if (clickedCard.matchId === lastCard.matchId) {
        let matches = this.state.matches;
        this.setState({
          lastCard: null,
          matches: matches + 1,
          clicks: clickCount + 1
        });
      } else {
        setTimeout(() => {
          clickedCard.setState({flipped: false});
          lastCard.setState({flipped: false});
          this.setState({lastCard: null, clicks: clickCount + 1});
        }, 400);
      }
    } else {
      this.setState({clicks: clickCount + 1});
      this.setState({lastCard: clickedCard});
    }
  }

  roundTwo() {
    this.setState({
      modalOpen: false,
      lastCard: null,
      matches: 5,
      cards: shuffle(this.cards(DECK2)),
      clicks: 0
    });
  }

  restart() {
    this.setState({
      modalOpen: false,
      lastCard: null,
      matches: 0,
      cards: shuffle(this.cards(DECK1)),
      clicks: 0
    });
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  closeModal() {
    this.setState({modalOpen: false});
  }

  openModal() {
    this.setState({modalOpen: true});
  }

  nextLevel() {
    if (this.state.matches === 4) {
      return (
        <Modal className="level-1-modal"
          isOpen={true}
          onRequestClose={this.closeModal.bind(this)}>
          <h3>Congratulations on Finishing Level One!</h3>
          <button className="button" onClick={this.roundTwo.bind(this)}>Play Level 2!</button>
        </Modal>
      );
    } else if (this.state.matches === 9){
      return (
        <Modal className="level-2-modal"
          isOpen={true}
          onRequestClose={this.closeModal.bind(this)}>
          <h3>Congratulations on Finishing Level Two!</h3>
          <button className="button" onClick={this.restart.bind(this)}>Replay Level 1!</button>
        </Modal>
      );
    }
  }

  render() {
    return (
      <div className="game-container">
          <div className="modal-container">
            {this.nextLevel()}
          </div>
          <div className="game-board">
            {this.state.cards}
          </div>
          <div className="footer">
            <div className="counter">
              Click Count: {this.state.clicks}
            </div>
          </div>
      </div>
    );
  }
}

export default Game;
