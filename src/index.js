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
    data: { results: [] },
    details: { id: [0] },
    species: { results: [] }
  };
 
  getInfo = async (direction) => {
     
    const response = await fetch(this.state.data.results.length
      // 'results' array has a length. Loads new page:
        ? this.state.data[direction]
      // 'results' array has no length. First page-load:
        : `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=12`)
    
    return await response.json()
      .then(data => {
        this.setState({ data: data });
      });
  };

  getSpecies = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    return await response.json()
      .then(json => {
        this.setState({ species: json });
    })
  };

  getDetails = async (name) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return await response.json()
      .then(json => {
        this.setState({ details: json });
        console.log(json);
        console.log(this.state.details.abilities[0].ability.name)
      
        this.getSpecies(this.state.details.id);
      })
  };

  showDetails = (name) => {
    this.getDetails(name);
      
    let details = document.querySelector(`li#${name} > div.details`)
    let otherPokes = document.querySelectorAll(`ul#list > li:not(#${name})`)
    let otherButtons = document.querySelectorAll(`div#main-content > button:not(#back)`)
    let backButton = document.getElementById('back')
    
    for (let li of otherPokes) {
      li.style.display='none';
    };    
    for (let button of otherButtons) {
      button.style.display='none';
    };

    backButton.style.display='inline-block';
    details.style.display='block';
    
    function goBack () {
      details.style.display='none';
      backButton.style.display='none';
  
      for (let li of otherPokes) {
          li.style.display='inline-block';
        };    
      for (let button of otherButtons) {
          button.style.display='inline-block';
        };
    }
  }
  
  componentDidMount() {
    this.getInfo()
  }
  
  render () {
    const capitalize = string => string[0].toUpperCase() + string.slice(1);

    const details = this.state.details
    const pokeList = this.state.data.results ? this.state.data.results : 'Loading...'
    const sprite = details.sprites ? details.sprites.front_default  : ''
    const species = this.state.species.genera ? this.state.species.genera[2].genus : 'Loading...'
    const id = details.id ? details.id : 'Loading...'
    const types = details.types
      ? details.types.map(entry => capitalize(entry.type.name)).join(' / ')
      : 'Loading...'
    const abilities = details.abilities 
      ? details.abilities.map(entry => capitalize(entry.ability.name)).join(', ')
      : 'Loading...'
    const weight = details.weight ? details.weight : 'Loading...'

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

                <div className='details'>
                  <img src={sprite} 
                  alt= {`${poke.name}`} />
                  {/* Alternative way of sourcing image:

                  <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${details.id}.png`} 
                    alt= {`${poke.name}`} /> */}
                  <p>#{id}</p>
                  <p>"{species}"</p>

                  <p><strong>Type: </strong>
                    {types}</p>                  

                  <p><strong>Abilities: </strong>
                  {abilities}</p>                 
                  <p><strong>Weight: </strong>
                  {weight}</p>
                </div>
              </li>
            ))}
          </ul>

          <button id='previous' className='btn' onClick={() => this.getInfo("previous")}>
            Previous
          </button>
          <button id='next' className='btn' onClick={() => this.getInfo("next")}>
            Next
          </button>
          <button id='back' className='btn' onClick={() => this.showDetails.goBack()}>
            Back
          </button>
        </div>

        <img
          id='pika'
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
