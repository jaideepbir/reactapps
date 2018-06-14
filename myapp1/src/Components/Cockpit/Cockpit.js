import React from 'react'
import classes from './Cockpit.css'
import './Cockpit.css'

console.log(classes);

const Cockpit = (props) => {
    let btnClass = 'button';
    const assignedClasses = [];
    if (props.persons.length <=2){
        assignedClasses.push('red');        
        // assignedClasses.push(classes.red);        
    }
    if (props.persons.length <=1){
        assignedClasses.push('bold');        
        // assignedClasses.push(classes.bold);        
    }
    if (props.showPersons){btnClass = "Red"}

    return (
        <div className={classes.Cockpit}>
            <h1 className="App-title">{props.appTitle}</h1>
                <p className={assignedClasses.join(' ')}> This is working well! </p>
            <button 
            className={btnClass}
            onClick = {props.toggle}> Toggle Persons </button>
            <button 
            className={btnClass}
            onClick = {(e) => props.switch(e, 'Max')}> Switch Persons </button>

        </div>
        
    );


}

export default Cockpit;