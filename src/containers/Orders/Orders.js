import React, { Component } from 'react';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Order from '../../components/Order/Order';

class Orders extends Component {
    
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        fetch('https://burger-builder-ec9cf.firebaseio.com/orders.json')
        .then(res => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject('Network Error')
        })
        .then(data => {
            this.setState({loading: false})
            console.log(data)
            const fetchedOrders = [];
            for(let key in data) {
                fetchedOrders.push({
                    ...data[key],
                    id: key
                });
            }
            console.log(fetchedOrders, 'fetchedOrders')
            this.setState({orders: fetchedOrders})
        })
        .catch(err => (console.log(err, 'Error')))
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price} />
                ))}
            </div>
        );
    }
}

export default Orders;