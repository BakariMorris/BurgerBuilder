import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/Layout/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/Layout/UI/Spinner/Spinner';
import ErrorHandler from '../../components/Layout/errorHandler/errorHandler';
import * as actionTypes from '../../store/actions';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    
    state = {
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        hasNetworkError: false
    }

    componentDidMount () {
        // fetch('https://burger-builder-ec9cf.firebaseio.com/ingredients.json')
        // .then(response => {
        //     if(response.ok) {
        //         return response.json()
        //     }
        // })
        // .then(data => {
        //     console.log(data, 'ingredients response');
        //     this.setState({ingredients: data});
        // })
        // .catch(err => this.setState( {loading: false, purchasing: false, hasNetworkError: true} ))
        
        
    }

    updatePurchaseState (ingredients) {
        const sum = Object.values(ingredients)
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
            this.setState({purchaseable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.props.ings[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.props.ings
        }
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.props.ings[type];
        const updatedCount = oldCount - 1;
        if(updatedCount < 0) { return };

        const updatedIngredients = {
            ...this.props.ings
        }
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.setState( {loading: true} );

        
        const queryParams = [];
        for(let i in this.props.ings) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]))
        }
        queryParams.push('price=' + this.state.totalPrice);

        this.props.history.push({
            pathname: '/checkout',
            search: queryParams.join('&')

        });

    }

    toggleErrorHandler = () => {
        this.setState(prevState => ({hasNetworkError: !prevState.hasNetworkError}));
    }

    render () {
        const disabledInfo = {
            ...this.props.ings
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }



        let errorModal = null;
        if(this.state.hasNetworkError) {
            console.log('Error handler is being shown')
            errorModal = <ErrorHandler show={this.state.hasNetworkError} clicked={this.toggleErrorHandler} />
        }

        let orderSummary = null;
        let burger = <Spinner />;
        
        console.log(this.props.ings, 'Prop ingredients');
        if(this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}></Burger>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded} 
                        ingredientRemoved={this.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.state.purchaseable}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler} />
                        
                </Aux>
            ) 

            orderSummary = <OrderSummary 
            ingredients={this.props.ings}
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            price={this.state.totalPrice}
            />
        }
        
        if (this.state.loading) {
            orderSummary = <Spinner />
        }


        return (
            <Aux>
                {burger}
                {errorModal}
               <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                   {orderSummary} 
                </Modal>
                
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: ingName => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: ingName => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);