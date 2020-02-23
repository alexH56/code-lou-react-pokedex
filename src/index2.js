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

class App extends Component {
    state = {
      data: { results: [] }
    };
   
    getInfo = async (direction) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=12`);
      return await response.json()
        .then(data => {
          this.setState({ data: data });
        });
    };
  
    componentDidMount() {
      this.getInfo()
    }
  
    changePage = async (direction) => {
      const response = await fetch(this.state.data[direction]);
      return await response.json()
        .then(data => {
          this.setState({ data: data });
        });
    };
  
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
            <ul>
              {pokeList.map(poke => (
                <li className='poke-card' key={poke.name}>
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

// serviceWorker.register();


// these are just tests -->
getInfo = async (direction) => {
     
    const response = await fetch(this.state.data.results
        ? this.state.data[direction]
        : `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=12`)
    
    return await response.json()
      .then(data => {
        this.setState({ data });
      });
  };
 
  // use a conditional to determine whether to use first page or the [direction] one

  changePage = async (direction) => {
    const response = await fetch(this.state.data[direction]);
    return await response.json()
      .then(data => {
        this.setState({ data: data });
      });
  };


