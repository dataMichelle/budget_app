import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, expenses, currency } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);
    const [totalExpenses, setTotalExpenses] = useState(0);

    useEffect(() => {
        const total = expenses.reduce((total, item) => {
            return (total += item.cost);
        }, 0);
        setTotalExpenses(total);
    }, [expenses]);

    const handleBudgetChange = (event) => {
        const value = event.target.value;
        if (value > 20000) {
            window.alert('Budget cannot exceed $20,000');
        } else if (value < totalExpenses) {
            window.alert('Budget cannot be less than total spending');
        } else {
            setNewBudget(value);
        }
    }

    return (
        <div className='alert alert-secondary'>
            <span>Budget: {currency}{budget}</span>
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">{currency}</span>
                </div>
                <input 
                    id="budget" 
                    type="number" 
                    step="10" 
                    max="20000" 
                    value={newBudget} 
                    onChange={handleBudgetChange} 
                    className="form-control"
                />
            </div>
        </div>
    );
};

export default Budget;
