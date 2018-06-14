import React from 'react';
import '../../Containers/App.css'

const userIn = (props) => {
    const style = {
        margin: "10px",
        border: "1px solid #eee",
        'boxShadow': '0 2px 3px #ccc',
        display: 'inline-block',
        width: '400px',
        padding: '16px',
        'textAlign': 'center',
        boxAlign: 'center'
    };

    return (
    <div style= {style}>
    <input 
        className="User" 
        type="text" 
        placeholder ='Username' 
        name = 'username' 
        onChange = {props.nameChange} 
         />
    <br/>
    <input 
        type="text" 
        placeholder ='Password' 
        name = 'password' 
        onChange = {props.nameChange} 
        />  
    <br/> <br/>
    <p >CharList Component</p>
    <input type="text" placeholder='Type text here' onChange={props.changedText} name="" id="" value={props.text}/>
    <p><strong> Chars: {props.text.length} </strong></p>      
    </div>
    );
}



export default userIn;