import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Meat', type: 'meat'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
    <p><strong>Current Price:   ${props.currPrice.toFixed(2)}</strong></p>
    {controls.map(ctrl => (<BuildControl 
                            key={ctrl.label} 
                            label={ctrl.label} 
                            added = {() => props.addIngredient(ctrl.type)}
                            removed = {() => props.deleteIngredient(ctrl.type)}
                            disable = {props.disabled[ctrl.type]}
                            />))}
    <button 
    className= {classes.OrderButton}
    disabled= {!props.purchasable}
    onClick= {props.ordered}
    type="submit">ORDER NOW 
    </button>
    </div>
);

export default buildControls;