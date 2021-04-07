import React, { Component } from 'react';
import Button from '../../../components/Layout/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/Layout/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients, 'this.props.ingredients')
        console.log(this.props.price, 'this.props.price')

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Bakari',
                address: {
                    street: '123 Flower Lane',
                    zipCode: '11311',
                    country: 'United States'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }

        fetch('https://burger-builder-ec9cf.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {'Content-type': 'application/json; charset=UTF-8'}
        })
        .then(response => {
            this.setState( {loading: false} );
            this.props.history.push('/')
            if(response.ok) {
                return response.json();
            }
            return Promise.reject('Posting failed')
        })
        .catch(err => {
            this.setState( {loading: false, hasNetworkError: true} );
        })

    }

    render() {

        let form = (
            <form>
                <input type="text" name='name' placeholder='Your name'></input>
                <input type="email" name='email' placeholder='Your email'></input>
                <input type="text" name='street' placeholder='Your street'></input>
                <input type="text" name='zip' placeholder='Your zip'></input>
                <Button clicked={this.orderHandler} btnType="Success">ORDER</Button>
            </form>);
        if(this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;