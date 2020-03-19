function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
 
    let input = expr.replace(/[^\(\)]/g, '');
    let length;
  
    do {
      length = input.length;
      input = input.replace('()', '');
    } while (length !== input.length);
  
    if (input.length !== 0) {
      throw new Error('Input Error');
    }
  
    const operationRange = {
      '(': 0,
      ')': 0,
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2,
    };
  
    const doOperation = {
      '+': function(x, y) {
        return x + y;
      },
      '-': function(x, y) {
        return x - y;
      },
      '*': function(x, y) {
        return x * y;
      },
      '/': function(x, y) {
        if (y === 0) {
          throw new Error('TypeError: Division by zero.');
        }
        return x / y;
      },
    };
  
    const isNumber = e => /\d+/.test(e);
  
    const exprArray = expr
      .replace(/\s+/g, '')
      .split(/(?<=[()+\-*/])|(?=[()+\-*/])/g);
  
    const stackNumber = [];
    const stackOperaion = [];
    let lastOperation;
    let prevNumber1;
    let prevNumber2;
  
    for (const token of exprArray) {
      if (isNumber(token)) {
        stackNumber.push(parseInt(token));
      } else if (token === '(') {
        stackOperaion.push(token);
      } else if (token === ')') {
        lastOperation = stackOperaion.pop();
        while (lastOperation !== '(') {
          prevNumber1 = stackNumber.pop();
          prevNumber2 = stackNumber.pop();
  
          stackNumber.push(doOperation[lastOperation](prevNumber2, prevNumber1));
          lastOperation = stackOperaion.pop();
        }
      } else {
        if (stackOperaion.length === 0) {
          stackOperaion.push(token);
        } else {
          let isValid = true;
          do {
            if (stackOperaion.length === 0) {
              stackOperaion.push(token);
              isValid = false;
            } else {
              lastOperation = stackOperaion.slice(-1)[0];
              if (operationRange[token] > operationRange[lastOperation]) {
                stackOperaion.push(token);
                isValid = false;
              } else {
                const prevNumber1 = stackNumber.pop();
                const prevNumber2 = stackNumber.pop();
  
                stackNumber.push(
                  doOperation[lastOperation](prevNumber2, prevNumber1),
                );
                stackOperaion.pop();
              }
            }
          } while (isValid);
        }
      }
    }
  
    lastOperation = stackOperaion.pop();
    while (lastOperation) {
      prevNumber1 = stackNumber.pop();
      prevNumber2 = stackNumber.pop();
  
      stackNumber.push(doOperation[lastOperation](prevNumber2, prevNumber1));
      lastOperation = stackOperaion.pop();
    }
    return stackNumber[0];
}

module.exports = {
    expressionCalculator
}