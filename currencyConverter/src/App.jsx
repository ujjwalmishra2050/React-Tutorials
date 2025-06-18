import React, { useState } from 'react';
import Input from './components/Input';
import useCurrencyinfo from './hooks/useCurrencyinfo';
import './App.css';

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmt, setConvertedAmt] = useState(0);

  const currencyInfo = useCurrencyinfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmt(amount);
    setAmount(convertedAmt);
  };

  const convert = () => {
    setConvertedAmt(amount * currencyInfo[to]);
  };

  return (
    <div className="app">
      <h1 className="text-xl font-bold mb-4">Currency Converter</h1>
      
      <Input
        label="From"
        amount={amount}
        onAmountChange={setAmount}
        onCurrencyChange={setFrom}
        currencyOptions={options}
        selectedCurrency={from}
      />

      <div className="text-center my-2">
        <button onClick={swap} className="px-4 py-1 bg-blue-200 rounded">Swap</button>
      </div>

      <Input
        label="To"
        amount={convertedAmt}
        onAmountChange={setConvertedAmt}
        onCurrencyChange={setTo}
        currencyOptions={options}
        selectedCurrency={to}
        amountDisabled={true}
      />

      <div className="text-center mt-4">
        <button onClick={convert} className="px-4 py-2 bg-green-500 text-white rounded">
          Convert
        </button>
      </div>
    </div>
  );
}

export default App;
