import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import axios from 'axios';

export default class App extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/user`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
        console.log(persons)
      })
  }

  render() {
    return (
      <ul>
        {
          this.state.persons
            .map(person =>
              <li key={person.id}>{person.gender}</li>
            )
        }
      </ul>
    )
  }
}
