const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operator");
const clearBtns = document.querySelectorAll(".clear-btn");
const decimalBtn = document.getElementById("decimal");
const radixBtn = document.getElementById("radix");
const result = document.getElementById("result");
const display = document.getElementById("display");
const convertBtn = document.getElementById("convert");
let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = "";
function numberPress(number) {
  if (MemoryNewNumber) {
    display.value = number;
    MemoryNewNumber = false;
  } else {
    if (display.value === "0") {
      display.value = number;
    } else {
      display.value += number;
    }
  }
}
for (var i = 0; i < numbers.length; i++) {
  var number = numbers[i];
  number.addEventListener("click", function (e) {
    numberPress(e.target.textContent);
  });
}
for (var i = 0; i < operations.length; i++) {
  var operationBtn = operations[i];
  operationBtn.addEventListener("click", function (e) {
    operationPress(e.target.textContent);

  });
}

for (var i = 0; i < clearBtns.length; i++) {
  var clearBtn = clearBtns[i];
  clearBtn.addEventListener("click", function (e) {
    clear(e.target.textContent);
  });
}

radixBtn.addEventListener("click", function (e) {
  display.value =+ Math.sqrt(display.value);
  MemoryCurrentNumber=display.value;
  MemoryNewNumber = false;
});

function operationPress(op) {
  let localOperationMemory = display.value;
  if (MemoryNewNumber && MemoryPendingOperation !== "=") {
    console.log("if");
    display.value = MemoryCurrentNumber;
  } else {
    MemoryNewNumber = true;
    if (MemoryPendingOperation === "+") {
      MemoryCurrentNumber += +localOperationMemory;
    } else if (MemoryPendingOperation === "-") {
      MemoryCurrentNumber -= +localOperationMemory;
    } else if (MemoryPendingOperation === "*") {
      MemoryCurrentNumber *= +localOperationMemory;
    } else if (MemoryPendingOperation === "/") {
      MemoryCurrentNumber /= +localOperationMemory;
    } else if (MemoryPendingOperation === "Xy") {
      MemoryCurrentNumber = Math.pow(MemoryCurrentNumber, localOperationMemory);
    } else{
      console.log("else");
      MemoryCurrentNumber = +localOperationMemory;

    }
    if (MemoryCurrentNumber === 0.30000000000000004||MemoryCurrentNumber === -0.30000000000000004||
      MemoryCurrentNumber === 1.2000000000000002||MemoryCurrentNumber === -1.2000000000000002) {
      display.value = MemoryCurrentNumber.toFixed(1);
    }else if(MemoryCurrentNumber === -0.020000000000000004||MemoryCurrentNumber === 0.020000000000000004){
      display.value = MemoryCurrentNumber.toFixed(2);
    }else if(MemoryCurrentNumber === 255.99999999999997||MemoryCurrentNumber === -255.99999999999997){
      display.value = Math.ceil(MemoryCurrentNumber);
    }else if (MemoryCurrentNumber=== -256.51199999999994){
      display.value = MemoryCurrentNumber.toFixed(3);
    }else{
      display.value = MemoryCurrentNumber;
      MemoryPendingOperation = op;
    }
  }
}
decimalBtn.addEventListener("click", decimal);
function decimal(argument) {
  let localDecimalMemory = display.value;

  if (MemoryNewNumber) {
    localDecimalMemory = "0.";
    MemoryNewNumber = false;
  } else {
    if (localDecimalMemory.indexOf(".") === -1) {
      localDecimalMemory += ".";
    }
  }
  display.value = localDecimalMemory;
}
function clear(id) {
  if (id === "ce") {
    display.value = "0";
    MemoryNewNumber = true;
  } else if (id === "c") {
    display.value = "0";
    MemoryNewNumber = true;
    MemoryCurrentNumber = 0;
    MemoryPendingOperation = "";
  }
}
convertBtn.addEventListener("click", function (e) {
  let localOperationMemory = display.value;
  display.value = -Math.abs(localOperationMemory);
});


