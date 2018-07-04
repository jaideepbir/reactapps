import React from 'react';
import classes from './Input.css';

const Input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched){
         inputClasses.push(classes.Invalid);
    };

    switch(props.elementType){
        
        case ('input'):
            inputElement = <input 
            className={inputClasses.join(' ')}
            onChange = {props.changed} 
            {...props.elementConfig} 
            value={props.value}/>;
            break;
        case ('textarea'):
            inputElement = <textarea 
            className={inputClasses.join(' ')} 
            onChange = {props.changed}
            {...props.elementConfig} 
            value={props.value}/>;
            break;
        case ('select'):
            inputElement = (
            <select 
                className={inputClasses.join(' ')}
                onChange = {props.changed} 
                value={props.value}
                {...props.elementConfig}>
                {props.elementConfig.options.map(option => (    
                            <option
                                key={option.value}
                                value={option.value}>
                                    {option.displayValue}
                            </option>
                ))} 
            </select>);
            break;
        default:
            inputElement= <input 
            className={classes.InputElement} 
            {...props.elementConfig} 
            value={props.value}/>;
    }
    // switch(props.inputtype){
    //     case ('input'):
    //         inputElement = <input type="text"className={classes.InputElement} {...props}/>;
    //         break;
    //     case ('textarea'):
    //         inputElement = <textarea className={classes.InputElement}/>;
    //         break;
    //     default:
    //         inputElement= <input type="text"className={classes.InputElement}/> 

    // }

  return (
    <div className={classes.Input}>
         <label htmlFor="" className={classes.Label}>{props.label}</label>
         {inputElement}
      
    </div>
  )
}

export default Input;
