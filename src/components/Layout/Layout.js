import React, { Component } from 'react';

import Aux from '../../hoc/Auxillary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component{

    state = {
        showSideDrawer: false
    }
    
    toggleSideDrawer = () => {
        this.setState(prevState => ({showSideDrawer: !prevState.showSideDrawer}))
    }

    // Hide the side bar by default
    // Create open handler
    // Create a menu
    // Create click listener for Menu to open & close the side drawer

    render () {
        return (
            <Aux>
                <SideDrawer open={this.state.showSideDrawer} closed={this.toggleSideDrawer} />
                <Toolbar openMenu={this.toggleSideDrawer} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    } 
}

export default Layout;