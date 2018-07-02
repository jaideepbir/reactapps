import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

// import axios from 'axios';

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
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        // alert('Pay Now!');
        this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Jaideep Bir',
                address: {
                    street: '2051 Borealis Way',
                    city: 'Weston',
                    state: "FL",
                    zipcode: '33327',
                    country: 'USA'
                },
                email: 'test@gmail.com',
                deliveryMethod: 'fastest'
            }
        } 
        axios.post('/orders.json', order)
        .then(response => {
            // console.log(response)
            this.setState({loading: false, purchasing: false});
        })
        .catch(error => {
            // console.log(error)
            this.setState({loading: false, purchasing: false});
        });
    }

    componentDidMount(){
        axios.get('https://burger-builder-jai.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data})
        })
        .catch(error => {
            console.log(error);
            this.setState({error: true})
        });
    }

    updatePurchaseState = (ingredients) => {
        // const ingredients = {...this.state.ingredients};
        const sum = Object.keys(ingredients)
            .map(igKey => { return ingredients[igKey]; })
            .reduce((sum, el) => {return sum + el} , 0);
        // console.log(sum);
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

        let orderSummary = null;

        let burger = this.state.error ? <p> Ingredients didn't load! </p> : <Spinner />;

        if (this.state.ingredients){
            burger = (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    addIngredient = {this.addIngredientHandler}
                    deleteIngredient = {this.removeIngredientHandler}
                    disabled = {disableInfo}    
                    purchasable = {this.state.purchasable}
                    ordered = {this.purchaseHandler}
                    currPrice = {this.state.totalPrice}/>
            </Aux>
            );
            orderSummary = <OrderSummary 
                    ingredients = {this.state.ingredients}
                    price = {this.state.totalPrice}
                    purchaseCancelled = {this.purchaseCancelHandler}
                    purchaseContinued = {this.purchaseContinueHandler}
        />;
        }
        if (this.state.loading){
            orderSummary = <Spinner />;
        }
        

        return (
            <Aux>
                <Modal show= {this.state.purchasing} modalClosed={this.purchaseCancelHandler}> 
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);