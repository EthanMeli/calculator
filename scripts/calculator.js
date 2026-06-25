const numbers = Array.from(document.body.querySelectorAll(".number"));
const operators = Array.from(document.body.querySelectorAll(".operator"));
const equals = document.body.querySelector(".equals");
const clear = document.body.querySelector(".clear");

const equation = document.body.querySelector(".equation");
const result = document.body.querySelector(".result");

let numA = 0;
let numB = 0;
let op = null;
let opDisplay = null;

equals.addEventListener("click", () => {
  if (op === null) {
    equation.textContent = `${numA}`;
  } else {
    const res = operate(Number(numA), Number(numB), op);
    equation.textContent = `${numA} ${opDisplay} ${numB} =`;
    result.textContent = res;
    if (Number(res) !== "NaN") numA = res;
    else numA = 0;
    numB = 0;
  }
})

clear.addEventListener("click", () => {
  numA = 0;
  numB = 0;
  op = null;
  equation.textContent = '0';
  result.textContent = '0';
})

for (const number of numbers) {
  number.addEventListener("click", () => {
    if (op === null) {
      if (numA !== 0) numA += number.textContent;
      else numA = number.textContent;
      result.textContent = `${numA}`;
    } else {
      if (numB !== 0) numB += number.textContent;
      else numB = number.textContent;
      result.textContent = `${numA} ${opDisplay} ${numB}`
    }
  });
}

for (const operator of operators) {
  if (operator.id) {
      operator.addEventListener("click", () => {
      op = operator.id;
      opDisplay = operator.textContent;
      result.textContent = `${numA} ${opDisplay}`;
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
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      if (b === 0) return "ERR: DIV BY 0";
      else return divide(a, b);
    default:
      console.log(`Unknown operation: ${op}.`);
  }
}