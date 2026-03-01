const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearButtons = document.querySelectorAll(".clear-btn");
const decimalButton = document.getElementById("decimal");
const radixButton = document.getElementById("radix");
const display = document.getElementById("display");
const convertButton = document.getElementById("convert");

let memoryCurrentNumber = 0;
let memoryNewNumber = false;
let memoryPendingOperation = "";

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return value;
  }

  return parseFloat(value.toFixed(12));
}

function setDisplayValue(value) {
  display.value = String(formatNumber(value));
}

function getDisplayValue() {
  return Number(display.value);
}

function numberPress(number) {
  if (memoryNewNumber) {
    display.value = number;
    memoryNewNumber = false;
    return;
  }

  display.value = display.value === "0" ? number : display.value + number;
}

function runPendingOperation(currentValue) {
  switch (memoryPendingOperation) {
    case "+":
      return memoryCurrentNumber + currentValue;
    case "-":
      return memoryCurrentNumber - currentValue;
    case "*":
      return memoryCurrentNumber * currentValue;
    case "/":
      return memoryCurrentNumber / currentValue;
    case "Xy":
      return Math.pow(memoryCurrentNumber, currentValue);
    default:
      return currentValue;
  }
}

function operationPress(operation) {
  if (memoryNewNumber && memoryPendingOperation !== "=") {
    memoryPendingOperation = operation;
    return;
  }

  const currentValue = getDisplayValue();
  memoryCurrentNumber = runPendingOperation(currentValue);
  setDisplayValue(memoryCurrentNumber);

  memoryNewNumber = true;
  memoryPendingOperation = operation;
}

function decimalPress() {
  if (memoryNewNumber) {
    display.value = "0.";
    memoryNewNumber = false;
    return;
  }

  if (!display.value.includes(".")) {
    display.value += ".";
  }
}

function clearPress(buttonText) {
  const normalizedText = buttonText.toLowerCase();

  if (normalizedText === "ce") {
    display.value = "0";
    memoryNewNumber = true;
    return;
  }

  if (normalizedText === "c") {
    display.value = "0";
    memoryNewNumber = true;
    memoryCurrentNumber = 0;
    memoryPendingOperation = "";
  }
}

numberButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    numberPress(event.target.textContent);
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    operationPress(event.target.textContent);
  });
});

clearButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    clearPress(event.target.textContent);
  });
});

radixButton.addEventListener("click", () => {
  memoryCurrentNumber = Math.sqrt(getDisplayValue());
  setDisplayValue(memoryCurrentNumber);
  memoryNewNumber = false;
});

decimalButton.addEventListener("click", decimalPress);

convertButton.addEventListener("click", () => {
  setDisplayValue(-getDisplayValue());
});
