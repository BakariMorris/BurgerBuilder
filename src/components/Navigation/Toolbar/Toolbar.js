import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../../components/Layout/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Menu from '../Menu/Menu';

const toolbar = props => (
    <header className={classes.Toolbar}>
        <Menu clicked={props.openMenu} show={props.show}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems></NavigationItems>
        </nav>
    </header>
);

export default toolbar;