import React from 'react';
import classes from './Menu.module.css'

const Menu = props => (
    <div className={classes.Menu} onClick={props.clicked}>
        <i className="fas fa-bars "></i>
    </div>
)

export default Menu;