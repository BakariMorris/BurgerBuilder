import * as actionTypes from './actions';

const initialState = {
    ingredients: {
            meat: 0,
            cheese: 0,
            bacon: 0,
            salad: 0
        },
    totalPrice: 4,
    purchasable: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state, 
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                purchasable: true
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state, 
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            }
        }
        default:
            return state;
    }
}

export default reducer;