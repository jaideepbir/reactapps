import React, { Component } from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Aux from '../Aux/Aux';
import classes from './Layout.css';

class Layout extends Component {
    render () {
        return (
            <Aux>
                <Toolbar />
                <SideDrawer />
                <main className={classes.Content}>
                    {this.props.children}
                </main>

            </Aux>
        )
    }
}

export default Layout;