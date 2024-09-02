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

// Header component
function Header() {
  return (
    <header className="header">
      <div className="logo">xe</div>
      <nav className="nav">
        <a href="#">Personal</a>
        <a href="#">Business</a>
        <a href="#">Send Money</a>
        <a href="#">Converter</a>
        <a href="#">Currency API</a>
        <a href="#">Tools</a>
        <a href="#">Resources</a>
      </nav>
      <div className="auth">
        <button className="sign-in">Sign In</button>
        <button className="register">Register</button>
      </div>
    </header>
  );
}

// Tabs component
function Tabs() {
  return (
    <div className="tabs">
      <button className="tab active">Convert</button>
      <button className="tab">Send</button>
      <button className="tab">Charts</button>
      <button className="tab">Alerts</button>
    </div>
  );
}

// Converter component with currency conversion functionality
function Converter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setConvertedAmount(null); // Reset the converted amount when swapping
  };

  const handleConvert = () => {
    // Placeholder conversion logic, assume 1:1 conversion rate for demonstration
    const conversionRate = 1; // In a real app, fetch this rate from an API
    setConvertedAmount((amount * conversionRate).toFixed(2));
  };

  return (
    <div className="converter">
      <h1>Xe Currency Converter</h1>
      <p>Check live foreign currency exchange rates</p>
      <div className="convert-section">
        <div className="input-group">
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="currency-group">
          <label>From</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
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
            onChange={(e) => setToCurrency(e.target.value)}
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
        <div className="conversion-result">
          {amount} {fromCurrency} = {convertedAmount} {toCurrency}
        </div>
      )}
      <div className="info">
        <p>
          We use the mid-market rate for our Converter. This is for informational purposes only. You won’t receive this rate when sending money.{' '}
          <a href="#">Login to view send rates</a>
        </p>
      </div>
    </div>
  );
}

// Main App component
function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <Tabs />
        <Converter />
      </div>
    </div>
  );
}

export default App;

