
var calculator = {
  expression: [],
  expressionLocale: [],
  userInput: null,
  userInputLocale: null,
  operator: null,
  operatorLocale: null,
  digitQueue: [],
  operatorStack: [],
  history: [],
  digits: {
    "zero": 0,
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9
  },
  operators: {
    "unary": "+/-",
    "addition": "+",
    "subtraction": "-",
    "multiplication": "*",
    "division": "÷",
    "equality": "=",
    "comma": ","
  },
  inputElement: document.getElementById("input"),
  expressionElement: document.getElementById("expression"),
  defaultInput: function () {
    calculator.addDigit(0)
    return;
  },
  resetDigitQueue: function () {
    calculator.digitQueue = []
    calculator.defaultInput()
    return;
  },
  insertValueOnTHML: function () {
    for(var digit in this.digits){
      document.getElementById(digit).innerText = this.digits[digit]
    }
  },
  insertOperatorOnHTML: function () {
    for (var op in this.operators) {
      document.getElementById(op).innerText = this.operators[op]
    }
  },
  onclickFunction: function () {
    var keys = document.getElementsByTagName("button")
    for (let index = 0; index < keys.length; index++){
      keys[index].onclick = function () {
        switch (keys[index].name) {
          case "clear":
            calculator.clear()
            break;
          case "clearEntry":
            calculator.clearEntry()
            break;
          case "clearLastDigit":
            calculator.clearLastDigit()
            break;
          case "digit":
            let digit = calculator.digits[keys[index].id]
            calculator.addDigit(digit)
            break;
          case "unary":
            calculator.unary()
            break;
          case "equality":
            calculator.equals()
            break;
          case "addition":
            calculator.addition()
            break;
          case "subtraction":
            calculator.subtraction()
            break;
          case "multiplication":
            calculator.multiplication()
            break;
          case "division":
            calculator.division()
            break;
          case "comma":
            calculator.addDecimalPoint()
            break;
        }
      }
    }
  },
  stringToNumber: function () {
    return parseInt(
      calculator.digitQueue.join(""),
      10
    )
  },
  numberToLocaleString: function () {
    return parseInt(
      calculator.digitQueue.join(""),
      10
    ).toLocaleString()
  },
  addDigit: function (digit) {
    // If an operator was issued, we reset the digitQueue to allow a new number composition 
    if (this.operator) {
      this.operator = null
      calculator.resetDigitQueue()
    }
    calculator.digitQueue.push(digit)
    this.userInput = this.stringToNumber()
    this.userInputLocale = this.numberToLocaleString()
    // TODO: Float number support
    //var isFloat = parseFloat(calculator.digitQueue.join(""), 10)
    //var isInteger = parseInt(calculator.digitQueue.join(""), 10)
    calculator.renderUserInput()
    return;
  },
  addition: function () {
    this.operator = "+"
    return calculator.pushExpression()
  },
  subtraction: function () {
    this.operator = "-"
    return calculator.pushExpression()
  },
  division: function () {
    this.operator = "/"
    return calculator.pushExpression()
  },
  multiplication: function () {
    this.operator = "*";
    return calculator.pushExpression()
  },
  unary: function () {
    if (calculator.digitQueue) {
      return
    }
    if (this.digitQueue.indexOf("-") === 0) {
      this.digitQueue.shift()
    } else {
      calculator.digitQueue.unshift("-")
    }
  },
  addDecimalPoint: function () {
    if (calculator.digitQueue.indexOf(".") < 0) {
      calculator.digitQueue.push('.')
      calculator.renderUserInput()
    }
  },
  equals: function () {
    this.operator = "=";
    this.pushExpression();

    var evaluation = eval(this.expression.join(""))

    calculator.updateUserInput(evaluation);
    calculator.pushExpression();
    calculator.renderExpression();
    calculator.appendHistoryChild();
    //this.clearHistory();
    return;
  },
  appendHistoryChild: function () {
    var history = document.getElementById("history")
    var li = document.createElement("li")
    var textNode = document.createTextNode(calculator.expressionLocale.join(""))
    li.appendChild(textNode)
    history.appendChild(li)
    return;
  },
  clear: function () {
    calculator.clearHistory()
    calculator.defaultInput()
    return;
  },
  clearEntry: function () {
    calculator.resetDigitQueue();
    return;
  },
  clearLastDigit: function () {
    calculator.digitQueue.pop()
    let newInput = calculator.digitQueue.join("")
    calculator.digitQueue = []
    calculator.updateUserInput(newInput)
    return;
  },
  clearHistory: function () {
    this.history = []
    this.expression = []
    this.expressionLocale = []
    calculator.renderExpression()
    return;
  },
  updateUserInput: function (userInput) {
    var input = userInput.toString()
    if (input.length >= 1) {
      for (let digit = 0; digit < input.length; digit++){
        console.log(typeof input[digit], input[digit])
        calculator.addDigit(input[digit])
      }
    }
    return;
  },
  pushExpression: function () {
    // TODO: Need an improvement
    
    if (this.operator === '=') { 
      calculator.expression.push(this.userInput)
    } else {
      calculator.expression.push(this.userInput, this.operator)
    }
    calculator.expressionLocale.push(this.userInput, this.operator)
    console.log(calculator.expression, calculator.expressionLocale)
    return calculator.renderExpression()
  },
  renderExpression: function () {
    calculator.expressionElement.innerText = calculator.expressionLocale.join("")
    return;
  },
  renderUserInput: function () {
    // The current userInput is always displayed
    if (this.userInput >= 0) {
      this.inputElement.innerText = `${this.userInputLocale}`
    }
    return;
  },
  startup: function () {
    calculator.insertValueOnTHML();
    calculator.insertOperatorOnHTML();
    calculator.defaultInput();
    calculator.onclickFunction();
  }
}

window.onload = calculator.startup()

