import React from 'react';
import '../../Containers/App.css'

const CharChomponent = (props) => {
    const style = {
        display: 'inline-block',
        padding: '16px',
        textAlign: 'center',
        margin: "16px",
        border: "1px solid black",
        boxShadow: '0 2px 3px #ccc',
    };
    return (
    <div style={style} onClick={props.clickedDelete} >
    {props.character}
    </div>
    );
}



export default CharChomponent;