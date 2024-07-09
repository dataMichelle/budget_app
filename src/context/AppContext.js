import React, { createContext, useReducer } from 'react';

// Reducer function
export const AppReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            const updatedExpensesAdd = state.expenses.map((expense) => 
                expense.name === action.payload.name
                    ? { ...expense, cost: expense.cost + action.payload.cost }
                    : expense
            );

            const totalExpensesAdd = updatedExpensesAdd.reduce((total, expense) => total + expense.cost, 0);

            if (totalExpensesAdd > state.budget) {
                alert('Cannot increase the allocation! Out of funds');
                return state;
            }

            return {
                ...state,
                expenses: updatedExpensesAdd
            };

        case 'RED_EXPENSE':
            const updatedExpensesRed = state.expenses.map((expense) =>
                expense.name === action.payload.name && expense.cost >= action.payload.cost
                    ? { ...expense, cost: expense.cost - action.payload.cost }
                    : expense
            );

            return {
                ...state,
                expenses: updatedExpensesRed
            };

        case 'DELETE_EXPENSE':
            const updatedExpensesDelete = state.expenses.map((expense) =>
                expense.name === action.payload ? { ...expense, cost: 0 } : expense
            );

            return {
                ...state,
                expenses: updatedExpensesDelete
            };

        case 'SET_BUDGET':
            return {
                ...state,
                budget: action.payload
            };

        case 'CHG_CURRENCY':
            return {
                ...state,
                currency: action.payload
            };

        default:
            return state;
    }
};

// Initial state
const initialState = {
    budget: 20000,
    expenses: [
        { id: "Marketing", name: 'Marketing', cost: 50 },
        { id: "Finance", name: 'Finance', cost: 300 },
        { id: "Sales", name: 'Sales', cost: 70 },
        { id: "Human Resource", name: 'Human Resource', cost: 40 },
        { id: "IT", name: 'IT', cost: 500 },
    ],
    currency: '$'
};

// Create context
export const AppContext = createContext();

// Provider component
export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const totalExpenses = state.expenses.reduce((total, expense) => total + expense.cost, 0);
    const remaining = state.budget - totalExpenses;

    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                budget: state.budget,
                remaining: remaining,
                dispatch,
                currency: state.currency
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
