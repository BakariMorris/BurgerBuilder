import React from 'react';

import Modal from '../UI/Modal/Modal';

const errorHandler = props => {
    return (
        <Modal 
            show
            modalClosed={props.clicked}>
            <p>Network error encountered, please try again.</p>
        </Modal>
    );
}

export default errorHandler;