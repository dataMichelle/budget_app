import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const CurrencySelector = () => {
    const { currency, dispatch } = useContext(AppContext);

    const handleCurrencyChange = (event) => {
        dispatch({ type: 'CHG_CURRENCY', payload: event.target.value });
    };

    return (
        <div className="alert alert-secondary">
            <label htmlFor="currency">Currency: </label>
            <select id="currency" value={currency} onChange={handleCurrencyChange} className="form-select">
                <option value="$">Dollar ($)</option>
                <option value="£">Pound (£)</option>
                <option value="₹">Rupee (₹)</option>
                <option value="€">Euro (€)</option>
            </select>
        </div>
    );
};

export default CurrencySelector;
