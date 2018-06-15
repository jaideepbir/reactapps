import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';

const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 1.3,
    bacon: 0.7,
    cheese: 0.4
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            bacon: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchasable: false,
    }

    updatePurchaseState = (ingredients) => {
        // const ingredients = {...this.state.ingredients};
        const sum = Object.keys(ingredients)
            .map(igKey => { return ingredients[igKey]; })
            .reduce((sum, el) => {return sum + el} , 0);
        console.log(sum);
        this.setState({purchasable : sum > 0})
    }

    addIngredientHandler = (type ) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount; 
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice + INGREDIENT_PRICES[type];
        this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type ) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <=0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount; 
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice - INGREDIENT_PRICES[type];
        this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});
        this.updatePurchaseState(updatedIngredients);
    }


    render () {
        const disableInfo = {...this.state.ingredients};
        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0 //converting Value to bool.
        }

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <Modal  />
                <BuildControls 
                addIngredient = {this.addIngredientHandler}
                deleteIngredient = {this.removeIngredientHandler}
                disabled = {disableInfo}
                purchasable = {this.state.purchasable}
                currPrice = {this.state.totalPrice}/>

            </Aux>
        );
    }
}

export default BurgerBuilder;