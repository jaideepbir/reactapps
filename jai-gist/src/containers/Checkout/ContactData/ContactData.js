import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: '',
                validations: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validations: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City',
                },
                value: '',
                validations: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            state: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'State',
                },
                value: '',
                validations: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code',
                },
                value: '',
                validations: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                },
                valid: false,
                touched: false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
                validations: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail',
                },
                value: '',
                validations: {
                    required: true,
                    touched: false,
                },
                valid: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{
                        value: 'fastest',
                        displayValue: 'Fastest'
                    },
                    {
                        value: 'cheapest',
                        displayValue: 'Cheapest'
                    }]
                },
                value: 'fastest',
                valid: true,
                validation: {},
                touched: false,
            }
        },
        formIsValid: false,
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;   
        };
        // console.log(formData);
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice, 
            orderData: formData
        }
        axios.post('/orders.json', order)
        .then(response => {
            // console.log(response)
            this.setState({loading: false});
            this.props.history.push('/');
        })
        .catch(error => {
            // console.log(error)
            this.setState({loading: false});
        });
    }
    inputChangedHandler(event, inputIdentifier){
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidation(updatedFormElement.value, updatedFormElement.validations);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;            
        };

        // updatedOrderForm[inputIdentifier].value = event.target.value;
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
        console.log(inputIdentifier,':', updatedFormElement.valid, 'formIsValid: ', formIsValid);
        // console.log(this.state.orderForm);
    }

    checkValidation(value, rules){
        let isValid = true;

        if (!rules){
            return true
        };
        if (rules.required){
            isValid = value.trim() !== '' && isValid;
        };
        if (rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        };
        if (rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        };
        return isValid;
        
    }

    render() {

        let formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        };

        let form = (
            <form action="" onSubmit={this.orderHandler}>
                {/* <Input elementType="..." elementConfig="..." value="..."/> */}
                {formElementsArray.map(formElement => {
                    return (
                    <Input 
                    key={formElement.id}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validations}
                    touched={formElement.config.touched}
                    value={formElement.config.value}/>
                    )})}
                {/* <Input inputtype="input" type="text" name="name" placeholder="Enter Name"/>
                <Input inputtype="input" type="text" name="email" placeholder="Enter Email"/>
                <Input inputtype="input" type="text" name="street" placeholder="Enter Street"/>
                <Input inputtype="input" type="text" name="zipcode" placeholder="Enter Zipcode"/> */}
                <br />
                {console.log(!this.state.formIsValid)}
                <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.formIsValid} >ORDER</Button>
                <Button btnType="Danger">CANCEL</Button>
            </form>);
        if (this.state.loading){
            form = <Spinner />;
        } 

        return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data:</h4>
            {form}
        </div>
        )
  }
}

export default ContactData;
