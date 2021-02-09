
var calculator = {
  evaluation: null,
  expression: [],
  expressionLocale: [],
  digitQueue: [],
  userInput: null,
  userInputLocale: null,
  operator: null,
  operatorLocale: null,
  operatorStack: [],
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
  history: [],
  defaultInput: function () {
    return calculator.addDigit(0)
  },
  resetDigitQueue: function () {
    calculator.digitQueue = []
    return calculator.defaultInput()
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
    // Dealing with a lParen and rParen variables would add more complexity
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
    return calculator.renderUserInput()
  },
  addition: function () {
    this.operator = "+"
    return calculator.setExpression()
  },
  subtraction: function () {
    this.operator = "-"
    return calculator.setExpression()
  },
  division: function () {
    this.operator = "/"
    return calculator.setExpression()
  },
  multiplication: function () {
    this.operator = "*";
    return calculator.setExpression()
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
    this.setExpression();
    var evaluation = eval(calculator.expression.join(""))
    calculator.appendHistoryChild()
    calculator.updateUserInput(evaluation)
    return this.clearHistory()
  },
  appendHistoryChild: function () {
    // TODO: Need an improvent
    var history = document.getElementById("history")
    var li = document.createElement("li")
    var textNode = document.createTextNode(calculator.expression.join(""))
    li.appendChild(textNode)
    return history.appendChild(li)
  },

  clear: function () {
    // TODO: Need an improvement
    calculator.clearHistory()
    return calculator.defaultInput()
  },
  clearEntry: function () {
    // TODO: Need an improvement
    return calculator.resetDigitQueue()
  },
  clearLastDigit: function () {
    // TODO: Need an improvement
    calculator.digitQueue.pop()
    let newInput = calculator.digitQueue.join("")
    calculator.digitQueue = []
    return calculator.updateUserInput(newInput)
  },
  clearHistory: function () {
    // TODO: Need an improvement
    this.history = []
    this.expression = []
    this.expressionLocale = []
    calculator.renderExpression()
    return;
  },
  updateUserInput: function (userInput) {
    var input = userInput.toString()
    if (input.length >= 1) {
      for (let digit = 0; digit < input.length ; digit++){
        calculator.addDigit(input[digit])
      }
    }
    return;
  },
  setExpression: function () {
    if (this.operator !== '=') {  
      calculator.expression.push(this.userInput, this.operator)
    } else {
      calculator.expression.push(this.userInput)
    }
    calculator.expressionLocale.push(this.userInput, this.operator)
    return calculator.renderExpression()
  },
  renderExpression: function () {
    var output = document.getElementById("expression")
    return output.innerText = calculator.expressionLocale.join("")
  },
  renderUserInput: function () {
    // The current userInput is always displayed
    var input = document.getElementById("input")
    if (this.userInput >= 0) {
      input.innerText = `${this.userInputLocale}`
    }
  },
  startup: function () {
    calculator.insertValueOnTHML();
    calculator.insertOperatorOnHTML();
    calculator.defaultInput();
    calculator.onclickFunction();
  }
}

window.onload = calculator.startup()

