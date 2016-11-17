import React, { Component } from 'react';
import Card from './Card';
import './Game.css';
import shuffle from 'lodash/shuffle';

import anemoneImg from './images/anemone.jpg';
import clownfishImg from './images/clownfish.jpg';
import mushroomImg from './images/mushroom.jpg';
import seahorseImg from './images/seahorse.jpg';
import shrimpImg from './images/shrimp.jpg';
import starfishImg from './images/starfish.jpg';
import tangImg from './images/tang.jpg';
import urchinImg from './images/urchin.jpg';

const DECK = [
  ['Anemone', anemoneImg],
  ['Clownfish', clownfishImg],
  ['Mushroom Coral', mushroomImg],
  ['Seahorse', seahorseImg],
  ['Cleaner Shrimp', shrimpImg],
  ['Starfish', starfishImg],
  ['Blue Hippo Tang', tangImg],
  ['Sea Urchin', urchinImg]
];

class Game extends Component {
  constructor() {
    super();
    this.state = {
      lastCard: null,
      matches: 0
    };
  }

  matchCheck(clickedCardComp, clickedCardDom) {
    let lastCard = this.state.lastCard;
    if (clickedCardComp.state.matched) {
      return;
    } else if (clickedCardComp === lastCard) {
      return;
    }

    if (lastCard) {
      if (clickedCardComp.matchId === lastCard.matchId) {
        let matches = this.state.matches;
        clickedCardComp.setState({matched: true});
        lastCard.setState({matched: true});
        this.setState({lastCard: null, matches: matches + 1});
      } else {
        this.setState({lastCard: null});
      }
    } else {
      this.setState({lastCard: clickedCardComp});
    }
  }

  cards() {
    const result = [];
    DECK.forEach((pair, i) => {
      pair.forEach((cardVal, j) => {
        if(j === 0){
          result.push(<Card
            matchId={i}
            type='text'
            value={cardVal}
            key={cardVal}
            />
          );
        } else {
          result.push(<Card
            matchId={i}
            type='url'
            value={cardVal}
            key={cardVal}
            />
          );
        }
      });
    });
    return (shuffle(result));
  }


  render() {
    return (
      <div className="game-board">
        {this.cards()}
      </div>
    );
  }
}

export default Game;
