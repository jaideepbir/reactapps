import React, { Component } from 'react';
import './Person.css'

class Person extends Component {
    render () {
        const style = {
            '@media (minWidth: 500px)': {
                width: '450px'
            }
        };
    
        return (
            <div className="Person" style= {style}>
            <p> I'm {this.props.name} and I'm {this.props.age} years old. </p>
            <p> {this.props.children} </p>
            <input type="text" onChange = {this.props.changed} value = {this.props.name}/>
            <button className="delButton"
            onClick = {this.props.click}> 
            Delete</button>
            </div>
        )
    }
} 

export default Person;