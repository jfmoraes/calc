

var calculator = {
  startup: function () {
    calculator.insertValueOnTHML();
    calculator.insertOperatorOnHTML();
    calculator.initDefault();
    calculator.onclickFunction();
    
  },
  evaluation: null,
  expression: [],

  digitQueue: [],

  defaultInput: [0],
  userInput: null,
  userInputLocale: null,
  lOperand: null,
  rOperand: null,
  lOperandLocale: null,
  rOperandLocale: null,
  operator: null,
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
  initDefault: function () {
    console.log('...')
    /*
    if (calculator.digitQueue.length === 1 && calculator.digitQueue[0] === 0) {
      this.lOperand = this.stringToNumber()
      this.lOperandLocale = this.numberToLocaleString()
      return calculator.renderOutput()
    }
    */
    return calculator.addDigit(0)
    
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
    var buttons = document.getElementsByTagName("button")
    for (let index = 0; index < buttons.length; index++){
      buttons[index].onclick = function () {
        
        switch (buttons[index].name) {
          case "digit":
            let digit = calculator.digits[buttons[index].id]
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
  pushFinalExpression: function () {
    if (this.lOperand && this.operator && this.rOperand) {
      calculator.history.push(
        `${this.lOperand} ${this.operator} ${this.rOperand}`
      )
    }
    return this.cleanExpressionFields()
  },
  cleanExpressionFields: function () {
    this.lOperand = null
    this.operator = null
    this.rOperand = null
    return;
  },
  initialInputNotFound: function () {
    if (calculator.digitQueue.length === 0) {
      console.log(calculator.digitQueue.length, 'initialInputNotFound Error')
      return true;
    }
  },
  resetDigitQueue: function () {
    return calculator.digitQueue = []
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
  overwriteDefaultInput: function () {
    
  },
  addDigit: function (digit) {
    console.log(calculator.digitQueue, calculator.digitQueue.join(""))
    calculator.digitQueue.push(digit)
    console.log(calculator.digitQueue, calculator.digitQueue.join(""), )
    
    /*
    if (!calculator.operator) {
      this.lOperand = this.stringToNumber()
      this.lOperandLocale = this.numberToLocaleString()
    }
    if (calculator.operator) {
      this.rOperand = this.stringToNumber()
      this.rOperandLocale = this.numberToLocaleString()
    }
    */
    
    if (!calculator.operator) {
      this.userInput = this.stringToNumber()
      this.userInputLocale = this.numberToLocaleString()
    }

    return calculator.renderOutput()

  },
  setExpression: function (operator) {
    calculator.expression.push(this.userInputLocale)
    calculator.expression.push(operator)
    console.log('exp: ', calculator.expression)
    return calculator.renderOutput()
  },
  addition: function () {
    return calculator.setExpression("+")
  },
  subtraction: function () {
    
  },
  division: function () {
    
  },
  multiplication: function () {
    
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
      calculator.renderOutput()
    }
  },
  equals: function () {
    console.log(Boolean(this.expression), this.expression,)
  },
  pushExpressionToOutput: function () {
    var output = document.getElementById("expression")
    if (this.lOperand >= 0) {
      output.innerText = `${this.lOperandLocale}`
      if (this.operator) {
        output.innerText = `${this.lOperandLocale} ${this.operator}`        
        if (this.rOperand) {
          output.innerText = `${this.lOperandLocale} ${this.operator} ${this.rOperandLocale}`
          calculator.pushFinalExpression()
        }
      }
    }     
  },
  renderOutput: function () {
    var input = document.getElementById("input")
    
    if (this.lOperand >= 0) {
      input.innerText = `${this.userInputLocale}`
    }


  }


}

window.onload = calculator.startup()

