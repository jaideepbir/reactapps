import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import Courses from './containers/Courses/Courses';
import Users from './containers/Users/Users';
import Aux from './Aux/Aux';
import './App.css';
import Redirect from 'react-router-dom/Redirect';

class App extends Component {
  state={
    showOl: false
  }

  hideInstructHandler = (even) => {
    // let display = this.state.showOl
    if (even !== 'home'){
      // console.log(even);
      this.setState({showOl: false})      
    } else {
      this.setState({showOl: true})   
    }
  }
  
  render () {
    const instructions = 
      <Aux>
        <h1>Welcome</h1>
        <ol style={{textAlign: 'left'}}>
          <li>Add Routes to load "Users" and "Courses" on different pages (by entering a URL, without Links)</li>
          <li>Add a simple navigation with two links => One leading to "Users", one leading to "Courses"</li>
          <li>Make the courses in "Courses" clickable by adding a link and load the "Course" component in the place of "Courses" (without passing any data for now)</li>
          <li>Pass the course ID to the "Course" page and output it there</li>
          <li>Pass the course title to the "Course" page - pass it as a param or score bonus points by passing it as query params (you need to manually parse them though!)</li>
          <li>Load the "Course" component as a nested component of "Courses"</li>
          <li>Add a 404 error page and render it for any unknown routes</li>
          <li>Redirect requests to /all-courses to /courses (=> Your "Courses" page)</li>
      </ol>
    </Aux>
    // let Jai = 'J'

    return (
      <BrowserRouter>
      <div className="App">
      {/* <button onClick={this.hideInstructHandler}>Toggle</button> */}
        <header>
          <nav>
            <ul>
              <li>
                <NavLink to='/'
                  exact
                  key = '1'
                  onClick={() => this.hideInstructHandler('home')}
                  > 
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to='/users'
                  onClick={this.hideInstructHandler}
                  key = '2'> 
                  Users
                </NavLink>
              </li>
              <li>
                <NavLink to='/courses'
                  onClick={this.hideInstructHandler}
                  key = '3'> 
                  Courses
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
        <Route path='/' exact render={() => instructions}/>
        <Route path='/users' component={Users}/>
        <Route path='/courses'component={Courses}/>
        <Redirect from="/all-courses" to="/courses" />
        <Route render={() => (<div>
                                <h1> 404 </h1>
                                <h2> Not Found! </h2>
                              </div>)} />
        </Switch>
        {/* {this.state.showOl ? instructions : null } */}
        
        {/* <Courses />
        <Users /> */}
      </div>÷
      </BrowserRouter>
    );
  }
}

export default App;
