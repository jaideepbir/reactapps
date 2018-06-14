import React, { Component } from 'react';
import './App.css';
import Persons from '../Components/Persons/Persons';
import UserComp from '../Components/User/UserComp';
import Cockpit from '../Components/Cockpit/Cockpit';

class App extends Component {

  state = {
      persons: [
      {name: "Jai", age: 34,id:'1'}, 
      {name: "Karan", age: 28, id:'2'},
      {name: "Vikram", age: 28, id:'3'}
      ],
      text: '',
      showPersons: false,
      creds: {username: 'karanbir', password: '1234'}    
    }
  
  switchNameHandler = (event, newName) => {
    this.setState({
      persons: [
        {name: newName, age: 34}, 
        {name: "Karan", age: 28}, 
        {name: "Vikram", age: 18}
        ]
    });
  }

  credsChangeHandler = (event) => {
    let creds = {...this.state.creds};
    creds = {...creds, [event.target.name]: event.target.value};
    console.log(creds);
    this.setState({creds});
  };

  textChangeHandler = (event) => {
    const editedText = event.target.value;
    if (editedText.length < 1) {
      this.setState({text: ''})
      console.log(editedText.length);
    } else {
      this.setState({text: editedText});
    }
  };

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

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow
    });
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    // console.log(persons)
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
    let persons = null;
    let btnClass = '';

    if (this.state.showPersons) {
      persons = <Persons
              persons = {this.state.persons}
              clicked = {this.deletePersonHandler}
              changed = {this.nameChangedHandler}
            />;
    }

    return (
      <div className="App">
        <header className="App-header">
          <Cockpit 
          appTitle = {this.props.title}
          persons = {this.state.persons}
          showPersons = {this.state.showPersons}
          switch = {this.switchNameHandler}
          toggle = {this.togglePersonHandler}
          />
          {persons}  
        </header>
        <br/>
        
      <UserComp
      text = {this.state.text}
      editedText = {this.textChangeHandler}
      clickedDelete = {this.deleteCharHandler}
      btnClass = {btnClass} 
      
      creds = {this.state.creds}
      nameChange = {this.credsChangeHandler}      
      />
      </div>
    );
    // return React.createElement('div', null, React.createElement('h1', {className: 'App'}, 'Jai\'s App'))
  }
}

export default App;