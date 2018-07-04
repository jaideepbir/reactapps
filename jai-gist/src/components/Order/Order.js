import React from 'react';
import classes from './Order.css';




const Order = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients){
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName],
            })   
    }
    const ingredOutput = ingredients.map(ig => {
        return <span key={ig.name}>{ig.name}  - ({ig.amount})</span>;
    })
    
    return (
        <div className={classes.Order}>
            <p><strong>Ingredients: </strong></p>
            {ingredOutput}
            {/* <p>Salad: {props.ingredients.salad}</p>
            <p>Bacon: {props.ingredients.bacon}</p>
            <p>Meat: {props.ingredients.meat}</p>
            <p>Cheese: {props.ingredients.cheese}</p> */}
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
}

export default Order;
