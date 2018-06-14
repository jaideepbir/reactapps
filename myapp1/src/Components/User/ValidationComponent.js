import React from 'react';
import '../App.css'


const Validation = (props) => {
    let showEnough = "Text long enough";

    if (props.len <=5 ) {
    showEnough = "Text too short!"
    }

    return (
    <div>
        Validation: {props.len}
        <p>{showEnough}</p>
        {/* {
            props.len>5? 
            <p>{showEnough}</p>:
            <p>Text too short!</p>    
        } */}
    </div>
    );
}



export default Validation;