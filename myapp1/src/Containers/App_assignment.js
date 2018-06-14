import React, { Component } from 'react';
import './App.css';
import UserInput from './User/UserInput';
import Validation from './User/ValidationComponent';
import CharComponent from './User/CharComponent';

class App extends Component {

  state = {
      persons: [
      {name: "Jai", age: 34,id:'1'}, 
      {name: "Karan", age: 28, id:'2'},
      {name: "Vikram", age: 28, id:'3'}
      ],
      showPersons: false,
      username: 'jaideepbir',
      password: 'test1234',
      text: '',
      longEnough: true
    }
  
  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    const person = {...this.state.persons[personIndex]};
    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person
    this.setState( {persons} );
  }

  textChangeHandler = (event) => {
    const editedText = event.target.value;
    if (editedText.length < 1) {
      this.setState({text: ''})
      // console.log(editedText.length);
    } else {
      this.setState({text: editedText});
      // console.log(editedText.length);
    }
  }

  // longHandler = () => {
  //   const longEnough = this.state.longEnough;
  //   this.setState({longEnough})
  // }
  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow
    });
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    console.log(persons)
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }

  deleteCharHandler = (index) => {
    const input = this.state.text.split('');
    input.splice(index, 1);
    const updatedText = input.join('');
    console.log(updatedText)
    this.setState({text: updatedText})
  }

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid grey',
      padding: '8px',
      cursor: 'pointer',
      margin: '5px'
    };

    let persons = null;
    let len = this.state.text.length

    if (this.state.showPersons) {
      persons = (
      <div> 

      </div> 
      );
    }
    
    const charList = this.state.text.split('').map((el, index) => {
      return <CharComponent 
      character={el} 
      key={index} 
      clicked = {() => this.deleteCharHandler(index)}
      />

    });

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Jai's App</h1>
          <p> This is working well! </p>
          <button 
          style = {style}
          onClick = {this.togglePersonHandler}> Toggle Persons </button>
          <button 
          style = {style}
          onClick = {() => this.togglePersonHandler}> Switch Persons </button>
          {persons}
        </header>
        <br/>
        <div className='UserInput'>
          <UserInput
          text = {this.state.text}
          changedText = {(event) => this.textChangeHandler(event)}          
          />
          <Validation   
          len = {len}
          />

          {charList} 
        </div>
      </div>
    );

    // return React.createElement('div', null, React.createElement('h1', {className: 'App'}, 'Jai\'s App'))
  }
}

export default App;