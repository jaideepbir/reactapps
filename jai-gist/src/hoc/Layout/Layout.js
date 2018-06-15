import React, { Component } from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

import Aux from '../Aux/Aux';
import classes from './Layout.css';

class Layout extends Component {
    render () {
        return (
            <Aux>
                <Toolbar />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;