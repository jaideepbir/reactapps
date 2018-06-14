import React from 'react';

const userOut = (props) => {
    return (
    <div>
        <p>Testing the UserOutput Comporent</p>
        <div className="username">
        <p> Username: {props.username} </p>
        </div>
        <div className="password">
        <p> Password: {props.password} </p>
        </div>

    </div>
    )
}

export default userOut;