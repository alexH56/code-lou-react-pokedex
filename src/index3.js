import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './styles.scss';

// import * as serviceWorker from './serviceWorker';

// const Pokedex = require('pokeapi-js-wrapper');

// const PokeClient = new Pokedex.Pokedex({
//   protocol: 'https',
//   cache: true,
//   timeout: 5000
// });

// NOTES FOR IMPROVEMENT: use one function for getInfo and changePage by implementing default Arguments. 
// Use anonymous function calls in onClick instead of separate prev and next functions

class App extends Component {
  state = {
    data: { results: [] }
  };
 
  getInfo = async (direction) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=12`);
    return await response.json()
      .then(data => {
        this.setState({ data });
      console.log(data)})
  };

  componentDidMount() {
    this.getInfo()
  }

  changePage = async (direction) => {
    const response = await fetch(this.state.data[direction]);
    return await response.json()
      .then(data => {
        this.setState({ data });
      });
  };

  showDetails = (name) => {
    let thisPoke = document.getElementById(name)
    let otherPokes = document.querySelectorAll(`ul#list > li:not(#${name})`)
    let otherButtons = document.querySelectorAll(`div#main-content > button:not(#back)`)
    let backButton = document.getElementById('back')
    console.log(otherPokes);
    console.log(thisPoke);

    for (let li of otherPokes) {
      li.style.display='none';
    };    
    for (let button of otherButtons) {
      button.style.display='none';
    };
    backButton.style.display='inline-block';

    
      
    // thisPoke.style.display='inline-block';
  }
  
  render () {
    const pokeList = this.state.data.results

    const capitalize = string => string[0].toUpperCase() + string.slice(1);

    return (
      <div className='App'>
        <div className='header'>
          <img
            className='header-logo'
            src='https://raw.githubusercontent.com/CodeLouisville/FSJS-Weekly-Challenges/master/Challenges/Week5/images/pokedex.png'
            alt='pokedex logo'
          />
          <h1>Pok&eacute;dex</h1>
        </div>

        <div id='main-content'>
          <ul id='list'>
            {pokeList.map(poke => (
              <li className='poke-card' id={poke.name} key={poke.name} onClick={() => this.showDetails(poke.name)}>
                <h3>{capitalize(poke.name)}</h3>
              </li>
            ))}
          </ul>

          <button id='previous' className='btn' onClick={() => this.changePage("previous")}>
            Previous
          </button>
          <button id='next' className='btn' onClick={() => this.changePage("next")}>
            Next
          </button>
          <button id='back' className='btn' onClick={() => this.goBack()}>
            Back
          </button>
        </div>

        <img
          id='pikachu'
          className='hvr-hang'
          src='https://raw.githubusercontent.com/CodeLouisville/FSJS-Weekly-Challenges/master/Challenges/Week5/images/pikachu.png'
          alt='Pikachu'
        />
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

// serviceWorker.register();
