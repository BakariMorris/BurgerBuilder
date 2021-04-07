import React from 'react';

import burgerLogo from '../../../assets/images/burger-logo.png';
import classes from './Logo.module.css';


const logo = props => (
    <div className={[classes.Logo, props.classOverwrite].join(' ')} style={{height: props.height}}>
        <img src={burgerLogo} alt="MyBurger" />
    </div>
);

export default logo;