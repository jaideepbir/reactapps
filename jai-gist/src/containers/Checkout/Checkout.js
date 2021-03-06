import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state= {
        ingredients: null,
        totalPrice: 0, 
    }

    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ing = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price'){
                price = param[1];
            } else {
                ing[param[0]]= +param[1];
            }
            this.setState({ingredients: ing, totalPrice: price });
            // console.log('Jaideep', ing)
        };
    }

    cancelledHander = () => {
        this.props.history.goBack();
    }

    continuedHander = () => {
        this.props.history.replace('/checkout/contact-data');

    }

    render() {
        return (
        <div>
            <CheckoutSummary 
                ingredients={this.state.ingredients}
                checkoutCancelled = {this.cancelledHander}
                checkoutContinued = {this.continuedHander} />
            <Route 
                path={this.props.match.path   + "/contact-data"} 
                render={(props) => <ContactData {...props} ingredients={this.state.ingredients} totalPrice={this.state.totalPrice}/>} 
                />
        </div>
        )
    }
}

export default Checkout;
