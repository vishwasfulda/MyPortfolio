import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

const CalculatorApp = ({ navigate }) => {
  const [input, setInput] = useState('0');
  const [history, setHistory] = useState('');
  const [pendingOperation, setPendingOperation] = useState(null);
  const [firstOperand, setFirstOperand] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  // Function to perform the calculation
  const calculate = (op, first, second) => {
    const num1 = parseFloat(first);
    const num2 = parseFloat(second);

    if (op === '+') return num1 + num2;
    if (op === '-') return num1 - num2;
    if (op === '*') return num1 * num2;
    if (op === '/') {
      if (num2 === 0) return 'Error: Div by Zero';
      return num1 / num2;
    }
    return second;
  };

  // Handler for number buttons
  const handleNumber = (number) => {
    if (waitingForSecondOperand) {
      setInput(String(number));
      setWaitingForSecondOperand(false);
    } else {
      setInput(input === '0' ? String(number) : input + number);
    }
  };

  // Handler for decimal point
  const handleDecimal = () => {
    if (waitingForSecondOperand) {
      setInput('0.');
      setWaitingForSecondOperand(false);
      return;
    }
    if (!input.includes('.')) {
      setInput(input + '.');
    }
  };

  // Handler for operations (+, -, *, /)
  const handleOperation = (nextOperation) => {
    const inputValue = parseFloat(input);

    if (pendingOperation && !waitingForSecondOperand) {
      // If there's a pending operation, calculate the result first
      const result = calculate(pendingOperation, firstOperand, inputValue);
      
      if (typeof result === 'string' && result.startsWith('Error')) {
        setInput(result);
        setHistory('');
        setFirstOperand(null);
        setPendingOperation(null);
        setWaitingForSecondOperand(false);
        return;
      }

      setFirstOperand(result);
      setInput(String(result));
      setHistory(`${result} ${nextOperation}`);
    } else if (pendingOperation === null) {
      // First time setting the operation
      setFirstOperand(inputValue);
      setHistory(`${inputValue} ${nextOperation}`);
    }

    setWaitingForSecondOperand(true);
    setPendingOperation(nextOperation);
  };

  // Handler for the equals button
  const handleEquals = () => {
    if (pendingOperation === null || waitingForSecondOperand) {
      return;
    }
    
    const inputValue = parseFloat(input);
    const result = calculate(pendingOperation, firstOperand, inputValue);

    if (typeof result === 'string' && result.startsWith('Error')) {
      setInput(result);
      setHistory('');
      setFirstOperand(null);
      setPendingOperation(null);
      setWaitingForSecondOperand(false);
      return;
    }

    setHistory(`${firstOperand} ${pendingOperation} ${inputValue} =`);
    setInput(String(result));
    setFirstOperand(result);
    setPendingOperation(null);
    setWaitingForSecondOperand(true);
  };

  // Handler for clearing the calculator
  const handleClear = () => {
    setInput('0');
    setHistory('');
    setFirstOperand(null);
    setPendingOperation(null);
    setWaitingForSecondOperand(false);
  };

  const handleSignChange = () => {
    setInput(String(parseFloat(input) * -1));
  };
  
  const handlePercentage = () => {
    setInput(String(parseFloat(input) / 100));
  };


  const calculatorButtons = [
    { label: 'C', className: 'bg-zinc-700 hover:bg-zinc-600', action: handleClear },
    { label: '+/-', className: 'bg-zinc-700 hover:bg-zinc-600', action: handleSignChange },
    { label: '%', className: 'bg-zinc-700 hover:bg-zinc-600', action: handlePercentage },
    { label: '/', className: 'bg-teal-500 hover:bg-teal-600', action: () => handleOperation('/') },
    
    { label: '7', className: 'bg-zinc-800 hover:bg-zinc-700', action: () => handleNumber(7) },
    { label: '8', className: 'bg-zinc-800 hover:bg-zinc-700', action: () => handleNumber(8) },
    { label: '9', className: 'bg-zinc-800 hover:bg-zinc-700', action: () => handleNumber(9) },
    { label: '*', className: 'bg-teal-500 hover:bg-teal-600', action: () => handleOperation('*') },
    
    { label: '4', className: 'bg-zinc-800 hover:bg-zinc-700', action: () => handleNumber(4) },
    { label: '5', className: 'bg-zinc-800 hover:bg-zinc-700', action: () => handleNumber(5) },
    { label: '6', className: 'bg-zinc-800 hover:bg-zinc-700', action: () => handleNumber(6) },
    { label: '-', className: 'bg-teal-500 hover:bg-teal-600', action: () => handleOperation('-') },
    
    { label: '1', className: 'bg-zinc-800 hover:bg-zinc-700', action: () => handleNumber(1) },
    { label: '2', className: 'bg-zinc-800 hover:bg-zinc-700', action: () => handleNumber(2) },
    { label: '3', className: 'bg-zinc-800 hover:bg-zinc-700', action: () => handleNumber(3) },
    { label: '+', className: 'bg-teal-500 hover:bg-teal-600', action: () => handleOperation('+') },
    
    { label: '0', className: 'col-span-2 bg-zinc-800 hover:bg-zinc-700', action: () => handleNumber(0) },
    { label: '.', className: 'bg-zinc-800 hover:bg-zinc-700', action: handleDecimal },
    { label: '=', className: 'bg-violet-500 hover:bg-violet-600', action: handleEquals },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 font-sans">
      
      {/* Back Button / Navigation */}
      <div className="w-full max-w-sm mb-4">
        <button
          onClick={() => navigate('portfolio')} // Navigate back to the main portfolio view
          className="flex items-center text-teal-400 hover:text-teal-300 transition-colors p-2 rounded-lg"
        >
          <ChevronLeft size={20} />
          <span className="text-sm font-medium ml-1">Back to Portfolio</span>
        </button>
      </div>

      {/* Calculator Container */}
      <div className="max-w-sm w-full bg-zinc-900 rounded-2xl shadow-2xl p-6 border border-zinc-700/50">
        
        {/* Display Area */}
        <div className="bg-zinc-800/70 p-4 rounded-xl mb-4 h-24 flex flex-col justify-end items-end text-right overflow-hidden border border-zinc-700">
          <div className="text-zinc-400 text-sm h-5 truncate w-full">{history}</div>
          <div className="text-white text-4xl font-light h-10 truncate w-full">{input}</div>
        </div>
        
        {/* Buttons Grid */}
        <div className="grid grid-cols-4 gap-3">
          {calculatorButtons.map((button, index) => (
            <button
              key={index}
              onClick={button.action}
              className={`p-4 text-white text-xl font-semibold rounded-xl transition-all shadow-md active:scale-95 ${button.className} ${button.label === '0' ? 'col-span-2' : ''}`}
              style={{
                gridColumn: button.label === '0' ? 'span 2 / span 2' : 'span 1 / span 1',
              }}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalculatorApp;