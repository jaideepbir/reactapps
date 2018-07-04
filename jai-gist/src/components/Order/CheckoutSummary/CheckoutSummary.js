import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Hope it tastes good!</h1>
      <div style={{width:"100%", margin:"auto", }}>
        {props.ingredients ? <Burger ingredients={props.ingredients}/> : <p>Refresh Your Page</p> }  
          <Button 
            btnType="Danger"
            clicked={props.checkoutCancelled}>CANCEL</Button>
          <Button 
            btnType="Success"
            clicked={props.checkoutContinued}>CONTINUE</Button>

      </div>
    </div>
  )
}

export default CheckoutSummary
