import React, { Component } from 'react';
import './Card.css';
import ocean from './images/ocean.jpg';


const ANIMAL_INFO = {
  'Anemone': "Sea anemones look like flowers but are actually animals. Their “petals” are armlike body parts called tentacles, which circle the mouth. The tentacles may be red, yellow, green, blue, orange, brown, white, or a mixture of colors.",
  'Clownfish': "Clown fish, also called anemone fish, live in close association with anemones and are protected from their stings by mucus.",
  'Mushroom Coral': "Mushroom coral are large disc shape invertebrates that attach to rocks. If the corals are split they will create two new corals",
  'Seahorse': "A sea horse is an unusual fish with a horselike head. There are more than 20 species, or types, of sea horse.",
  'Cleaner Shrimp': "Cleaner Shrimp are like the doctors of the ocean. They will set up shop on live rock or coral outcroppings and wait for fish to come and be cleaned of parasites or dead tissue. ",
  'Starfish': "Starfish, like sea urchins and sand dollars, do not have backbones, which makes them part of a group called invertebrates. They have five arms and primarily feed on clams and mussels.",
  'Blue Hippo Tang': "Blue Hippo Tangs are a type of surgeonfish with bright blue coloring, oval boddies, and yellow, flag-shaped tails. They are best known as the character Dori from finding Nemo",
  'Sea Urchin': "A Sea Urchin is a small sea creature that is related to the starfish, lives on the sea bottom, and is enclosed in a roundish shell covered with venomous spines that can move."
};

class Card extends Component {
  constructor(props) {
    super(props);
    this.value = this.props.value;
    this.type = this.props.type;
    this.matchId = this.props.matchId;
    this.state = { matched: false };

  }

  handleClick(e) {
    this.props.matchCheck(this, e.currentTarget);
  }

  cardValue() {
    if(this.type === 'text') {
      return (
        <li
          onClick={this.handleClick.bind(this)}
          data-matchId={this.matchId}
          className="name-card">
          <div
            className="front">
            <h1>{this.value}</h1>
            <div className="card-desc">{ANIMAL_INFO[this.value]}</div>
          </div>
          <div
            className="back">
            <img
              className="ocean-img"
              src={ocean}
              alt="Coral Match"
              style={{width:275, height:275}}
            ></img>
          </div>
        </li>
    );
    } else {
      return (
      <li
        onClick={this.handleClick.bind(this)}
        data-matchId={this.matchId}
        className="pic-card">
        <div className="front">
          <img
          className="pic-img"
          role="presentation"
          src={this.value}
          alt="Coral Match"
          style={{width:275, height:275}}
          ></img>
        </div>
        <div className="back">
          <img
            className="ocean-img"
            src={ocean}
            alt="Coral Match"
            style={{width:275, height:275}}
          ></img>
        </div>
      </li>
  );
    }
  }

  render() {
  return <ul className="cards">{this.cardValue()}</ul>;
}
}

export default Card;
