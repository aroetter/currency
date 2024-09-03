import React, { useState } from 'react';
import './App.css';

// List of the 20 most common currencies
const currencies = [
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'AUD', name: 'Australian Dollar' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'CHF', name: 'Swiss Franc' },
  { code: 'CNY', name: 'Chinese Yuan' },
  { code: 'SEK', name: 'Swedish Krona' },
  { code: 'NZD', name: 'New Zealand Dollar' },
  { code: 'MXN', name: 'Mexican Peso' },
  { code: 'SGD', name: 'Singapore Dollar' },
  { code: 'HKD', name: 'Hong Kong Dollar' },
  { code: 'NOK', name: 'Norwegian Krone' },
  { code: 'KRW', name: 'South Korean Won' },
  { code: 'TRY', name: 'Turkish Lira' },
  { code: 'RUB', name: 'Russian Ruble' },
  { code: 'INR', name: 'Indian Rupee' },
  { code: 'BRL', name: 'Brazilian Real' },
  { code: 'ZAR', name: 'South African Rand' },
];

// Converter component with currency conversion functionality
function Converter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState('');

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setConvertedAmount(null); // Reset the converted amount when swapping
  };

  const handleConvert = async () => {
    // Fetch exchange rates from the API
    try {
      const API_KEY = "7bd7016416703b993f6d81f2";
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`);
      const data = await response.json();

      if (data.result === "success") {
        const conversionRate = data.conversion_rates[toCurrency];
        setConvertedAmount((amount * conversionRate).toFixed(2));
        setError('');
      } else {
        setError('Failed to fetch conversion rates.');
      }
    } catch (err) {
      setError('Error fetching conversion rates.');
    }
  };

  return (
    <div className="converter">
      <h1>Currency Converter</h1>
      <p>Check live foreign currency exchange rates</p>
      <div className="convert-section">
        <div className="input-group">
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setConvertedAmount(null);
            }}
          />
        </div>

        <div className="currency-group">
          <label>From</label>
          <select
            value={fromCurrency}
            onChange={(e) => {
              setFromCurrency(e.target.value);
              setConvertedAmount(null);
            }}
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>

        <button className="swap-button" onClick={handleSwap}>
          ↔
        </button>

        <div className="currency-group">
          <label>To</label>
          <select
            value={toCurrency}
            onChange={(e) => {
              setToCurrency(e.target.value);
              setConvertedAmount(null);
          }}
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>

        <button className="convert-button" onClick={handleConvert}>
          Convert
        </button>
      </div>

      {convertedAmount !== null && (
        <div>
          <div className="conversion-result">
            {amount} {fromCurrency} = {convertedAmount} {toCurrency}
          </div>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      <div className="info">
        <p>Uses a real API now. Should probably hide the APIKEY (it's the free tier quota limited)</p>
      </div>
    </div>
  );
}

// Main App component
function App() {
  return (
    <div className="App">
      <div className="content">
        {/* Uncomment Tabs if you want to use them */}
        {/* <Tabs /> */}
        <Converter />
      </div>
    </div>
  );
}

export default App;
