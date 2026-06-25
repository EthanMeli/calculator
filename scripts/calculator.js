const numbers = Array.from(document.body.querySelectorAll(".number"));
const operators = Array.from(document.body.querySelectorAll(".operator"));
const equals = document.body.querySelector(".equals");

const equation = document.body.querySelector(".equation");
const result = document.body.querySelector(".result");

let numA = 0;
let numB = null;
let op = null;

for (const number of numbers) {
  number.addEventListener("click", () => {
    if (op === null) {
      numA = Number(number.textContent);
      result.textContent = `${numA}`;
    } else {
      numB = Number(number.textContent);
      result.textContent = `${numA} ${op} ${numB}`
    }
  });
}

for (const operator of operators) {
  if (operator.id) {
      operator.addEventListener("click", () => {
      op = operator.textContent;
      result.textContent = `${numA} ${op}`;
      console.log(op);
    })
  }
}

/* OPERATOR FUNCTIONS */
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(a, b, op) {
  switch (op) {
    case '&plus;':
      return add(a, b);
    case '&minus;':
      return subtract(a, b);
    case '&times;':
      return multiply(a, b);
    case '&divide;':
      if (b === 0) return "DIV BY 0 ERR";
      else return divide(a, b);
    default:
      console.log(`Unknown operation: ${op}.`);
  }
}