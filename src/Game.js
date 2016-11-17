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
      lastCard: {comp: null, dom: null},
      matches: 0
    };
  }

  cards(deck) {
    const result = [];
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

  matchCheck(clickedCardComp, clickedCardDom) {
    let lastCardComp = this.state.lastCard.comp;
    let lastCardDom = this.state.lastCard.dom;
    if (clickedCardComp.state.matched) {
      return;
    } else if (clickedCardComp === lastCardComp) {
      return;
    }
    let classNames = clickedCardDom.classList;
    if (classNames.contains("flipped") !== true ) {
      classNames.add("flipped");
    }

    if (lastCardComp) {
      if (clickedCardComp.matchId === lastCardComp.matchId) {
        let matches = this.state.matches;
        clickedCardComp.setState({matched: true});
        lastCardComp.setState({matched: true});
        this.setState({lastCard: {comp: null, dom: null}, matches: matches + 1});
      } else {
        setTimeout(() => {
          classNames.remove("flipped");
          lastCardDom.classList.remove("flipped");
          this.setState({lastCard: {comp: null, dom: null}});
        }, 400);
      }
    } else {
      this.setState({lastCard: {comp: clickedCardComp, dom: clickedCardDom}});
    }
  }

  reset() {
    this.setState({
      modalOpen: false,
      cards: shuffle(this.cards(DECK2)),
      lastCard: {comp: null, dom: null},
      matches: 0
    });
  }

  restart() {
    this.setState({
      modalOpen: false,
      cards: this.cards(shuffle(DECK1)),
      lastCard: {comp: null, dom: null},
      matches: 0
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
    if (this.state.matches === this.state.cards.length / 2) {
      return (
        <Modal className="level-2-modal"
          isOpen={true}
          onRequestClose={this.closeModal.bind(this)}>
          <h3>Congratulations on finishing level one!</h3>
          <button onClick={this.reset.bind(this)}>Play Level 2!</button>
          <button onClick={this.restart.bind(this)}>Replay Level 1</button>
        </Modal>
      );
    }
  }

  render() {
    return (
      <div className="game-board">
          <div>
            {this.nextLevel()}
          </div>
        {this.state.cards}
      </div>
    );
  }
}

export default Game;
