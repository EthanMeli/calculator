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
    let res = operate(Number(numA), Number(numB), op);
    const floatCheck = String(res).split(".");
    if (floatCheck[1] && floatCheck[1].length > 10) {
      res = res.toFixed(10);
    }
    equation.textContent = `${numA} ${opDisplay} ${numB} =`;
    result.textContent = res;
    if (Number(res) !== "NaN") numA = Number(res);
    else numA = 0;
    numB = 0;
  }
  clear.textContent = "AC";
})

/* 
  CLEAR BUTTON FUNCTIONALITY
    - Remove a single character/entry when button is "CE"
    - Clear everything when button is "AC"
  These two clearing modes are unique, and should be defined
  according to standard principles
*/
clear.addEventListener("click", () => {
  const resultLength = result.textContent.length;
  if (clear.textContent === "CE" && resultLength > 1) {
    // Without removing two characters in some cases, the user will
    // have to manually remove the space using CE, which is not desired
    if (result.textContent[resultLength - 2] === " ") {
      result.textContent = result.textContent.substring(0, resultLength - 2);
    } else {
      result.textContent = result.textContent.substring(0, resultLength - 1);
    }
    const vals = result.textContent.split(" ");
    if (vals.length === 3) {
      numB = vals[2];
    } else if (vals.length === 2) {
      numB = 0;
    } else {
      numA = vals[0];
      op = null;
      opDisplay = null;
    }
  } else if (clear.textContent === "AC") {
    numA = 0;
    numB = 0;
    op = null;
    opDisplay = null;
    equation.textContent = `Ans = ${result.textContent}`;
    result.textContent = "0";
    clear.textContent = "CE";
  } else {
    numA = 0;
    result.textContent = "0";
  }
})

for (const number of numbers) {
  number.addEventListener("click", () => {
    if (op === null) {
      if (String(numA).includes(".") && number.textContent === ".") return;
      if (numA !== 0) numA += number.textContent;
      else numA = number.textContent;
      result.textContent = `${numA}`;
    } else {
      if (String(numB).includes(".") && number.textContent === ".") return;
      if (numB !== 0) numB += number.textContent;
      else numB = number.textContent;
      result.textContent = `${numA} ${opDisplay} ${numB}`
    }
    clear.textContent = "CE";
  });
}

for (const operator of operators) {
  if (operator.id) {
      operator.addEventListener("click", () => {
        if (numB !== 0) equals.click();
        op = operator.id;
        opDisplay = operator.textContent;
        result.textContent = `${numA} ${opDisplay}`;
        clear.textContent = "CE";
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