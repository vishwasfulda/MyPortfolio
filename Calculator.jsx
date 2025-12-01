import React, { useState } from 'react';

const CalculatorApp = () => {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  // Helper function to handle number input
  const inputDigit = (digit) => {
    if (waitingForNewValue) {
      setDisplay(String(digit));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  // Helper function to handle decimal point
  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  // Helper function to handle calculation reset
  const clearDisplay = () => {
    setDisplay('0');
    setCurrentValue(null);
    setOperator(null);
    setWaitingForNewValue(false);
  };

  // Helper function to handle percentage
  const togglePercentage = () => {
    const value = parseFloat(display);
    if (value === 0) return;
    setDisplay(String(value / 100));
  };

  // Helper function to handle sign change (+/-)
  const toggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  // Perform the calculation logic
  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (currentValue === null) {
      setCurrentValue(inputValue);
    } else if (operator) {
      const result = calculate(currentValue, inputValue, operator);
      setCurrentValue(result);
      setDisplay(String(parseFloat(result.toFixed(8)))); // Display result, limiting decimals
    }

    setWaitingForNewValue(true);
    setOperator(nextOperator);
  };

  // The core calculation logic
  const calculate = (left, right, op) => {
    switch (op) {
      case '+': return left + right;
      case '-': return left - right;
      case '*': return left * right;
      case '/': 
        if (right === 0) {
          return 'Error'; // Handle division by zero
        }
        return left / right;
      default: return right;
    }
  };

  const handleEquals = () => {
    if (currentValue !== null && operator !== null && !waitingForNewValue) {
      const inputValue = parseFloat(display);
      const result = calculate(currentValue, inputValue, operator);
      
      if (result === 'Error') {
        setDisplay('Error');
      } else {
        setDisplay(String(parseFloat(result.toFixed(8))));
      }

      setCurrentValue(null);
      setOperator(null);
      setWaitingForNewValue(true); 
    }
  };

  // Button component for styling
  const CalculatorButton = ({ label, className = '', onClick, type = 'number' }) => {
    let baseStyles = 'p-4 rounded-xl text-2xl font-semibold transition-all shadow-lg active:scale-95';
    
    // Type-based styles
    if (type === 'function') {
      baseStyles += ' bg-zinc-800 text-teal-400 hover:bg-zinc-700/80';
    } else if (type === 'operator') {
      baseStyles += ' bg-teal-500 text-zinc-950 hover:bg-teal-400';
    } else if (type === 'equals') {
      baseStyles += ' bg-violet-600 text-white hover:bg-violet-500';
    } else {
      // Number buttons
      baseStyles += ' bg-zinc-900 text-white hover:bg-zinc-800';
    }

    return (
      <button 
        className={`${baseStyles} ${className}`} 
        onClick={onClick}
      >
        {label}
      </button>
    );
  };

  const buttons = [
    { label: 'AC', type: 'function', action: clearDisplay },
    { label: '+/-', type: 'function', action: toggleSign },
    { label: '%', type: 'function', action: togglePercentage },
    { label: '/', type: 'operator', action: () => performOperation('/') },
    
    { label: '7', type: 'number', action: () => inputDigit(7) },
    { label: '8', type: 'number', action: () => inputDigit(8) },
    { label: '9', type: 'number', action: () => inputDigit(9) },
    { label: '*', type: 'operator', action: () => performOperation('*') },
    
    { label: '4', type: 'number', action: () => inputDigit(4) },
    { label: '5', type: 'number', action: () => inputDigit(5) },
    { label: '6', type: 'number', action: () => inputDigit(6) },
    { label: '-', type: 'operator', action: () => performOperation('-') },

    { label: '1', type: 'number', action: () => inputDigit(1) },
    { label: '2', type: 'number', action: () => inputDigit(2) },
    { label: '3', type: 'number', action: () => inputDigit(3) },
    { label: '+', type: 'operator', action: () => performOperation('+') },

    { label: '0', type: 'number', action: () => inputDigit(0), className: 'col-span-2' },
    { label: '.', type: 'number', action: inputDecimal },
    { label: '=', type: 'equals', action: handleEquals },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-zinc-900 p-6 rounded-3xl shadow-2xl border border-white/10 backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-center text-white mb-6">React Calculator</h1>
        
        {/* Display Area */}
        <div className="bg-zinc-800/70 p-5 mb-6 rounded-xl text-right overflow-hidden shadow-inner">
          {/* History/Operator */}
          <div className="h-6 text-zinc-500 text-sm font-mono mb-1">
            {currentValue !== null && operator && (
              `${currentValue} ${operator}`
            )}
          </div>
          {/* Current Input */}
          <div className="text-white text-5xl font-light tracking-tight truncate" style={{ minHeight: '60px' }}>
            {display}
          </div>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-4">
          {buttons.map((button, index) => (
            <CalculatorButton
              key={index}
              label={button.label}
              className={button.className}
              onClick={button.action}
              type={button.type}
            />
          ))}
        </div>

        <p className="mt-8 text-center text-zinc-500 text-xs">
          Project for {`{React, Tailwind CSS, JavaScript}`} demonstration.
        </p>
      </div>
    </div>
  );
};

export default CalculatorApp;