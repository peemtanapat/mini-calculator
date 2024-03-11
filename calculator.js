const SCREEN = 'screen-text';
const FIRST_NUM = 'firstNum';
const SECOND_NUM = 'secondNum';
const OPERATOR = 'operator';

let firstNum = '';
let secondNum = '';
let operator = '';
let clickedOperator = false;

const addNumber = (number) => {
  const currentScreen = document.getElementById(SCREEN).innerHTML;
  if (number == '0' && currentScreen == '0') return;

  console.log({ addNumber: { currentScreen, firstNum, secondNum, operator } });

  if (currentScreen == '0' && number != '0') {
    document.getElementById(SCREEN).innerHTML = '';
  }

  if (clickedOperator) {
    if (secondNum === '') {
      clearScreen('');
    }
  }

  document.getElementById(SCREEN).innerHTML += number;

  if (clickedOperator) {
    secondNum += number;
  } else {
    firstNum += number;
  }
};

const addOperator = (_operator) => {
  console.log({ addOperator: { firstNum, secondNum, operator } });
  if (firstNum !== '' && secondNum !== '') {
    operator = _operator;
  }

  if (_operator === operator) {
    if (secondNum === '') return;

    calculate(false);
    return;
  }

  operator = _operator;
  clickedOperator = true;
};

const calculate = (resetOperator = true) => {
  console.log({ calculated: { firstNum, secondNum, operator } });
  if (firstNum === '' || secondNum === '') return;

  const result = calculateSwitch(firstNum, secondNum, operator);
  document.getElementById(SCREEN).innerHTML = result;

  firstNum = result;
  secondNum = '';
  if (resetOperator) {
    operator = '';
  }
};

const calculateSwitch = (firstNum, secondNum, operator) => {
  firstNum = parseNumber(firstNum);
  secondNum = parseNumber(secondNum);

  let result;
  switch (operator) {
    case '+':
      result = firstNum + secondNum;
      break;
    case '-':
      result = firstNum - secondNum;
      break;
    case '*':
      result = firstNum * secondNum;
      break;
    case '/':
      result = firstNum / secondNum;
      break;
    default:
      console.log('have no this operator');
  }

  return result;
};

const clearScreen = (text = '0') => {
  document.getElementById(SCREEN).innerHTML = text;

  if (clickedOperator) {
    secondNum = '';
  } else {
    firstNum = '';
  }
};

const resetAll = () => {
  clearScreen();
  firstNum = '';
  secondNum = '';
  operator = '';

  clickedOperator = false;
};

const parseNumber = (text) => {
  try {
    return parseInt(text);
  } catch (error) {
    return null;
  }
};
