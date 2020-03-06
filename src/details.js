import React, { Component } from 'react';

import './styles.scss';

export class Details extends Component {
  render () {
    const props = this.props;

    return (

      <div>

        <img
          src={props.sprite}
          alt={`${props.name}`}
        />

        <p>#{props.id}</p>

        <p>"{props.species}"</p>

        <p><strong>Type: </strong>
          {props.types}
        </p>

        <p><strong>Abilities: </strong>
          {props.abilities}
        </p>

      </div>
    );
  }
}
