import React from 'react';
import UserInput from './UserInput';
import UserOutput from './UserOutput';
import CharComponent from './CharComponent'


const UserComp = (props) => {    

  const charList = props.text.split('').map((el, index) => {
    return <CharComponent 
              character={el} 
              key={index} 
              clickedDelete = {(e) => props.clickedDelete(e)}
            />
  });

  return (
    <div className='UserInput'>
      <UserOutput
        username = {props.creds.username}
        password = {props.creds.password}
      />
      <UserInput
        user = {props.creds.username}
        pass = {props.creds.password}
        nameChange = {(event) => {
            props.nameChange(event)
          }
        }
      text = {props.text}
      changedText = {(event) => props.editedText(event)}
      />
      <br />

      {charList}
    </div>
  )
}    

export default UserComp;