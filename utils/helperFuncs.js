class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const hasValidParentheses = s => {
  const mappedVals = {
    "(": ")"
  }
  let stack = [];

  // Quita todo que no sea un ( o )
  s = [...s].filter(s => s === "(" || s === ")").join("");

  for (let i = 0; i < s.length; i++) {
      if (mappedVals[s[i]]) stack.push(mappedVals[s[i]]);
      else if (s[i] !== stack.pop()) return false;
  }

  return stack.length === 0;
}

// Algoritmo de: http://csis.pace.edu/~wolf/CS122/infix-postfix.htm
export const infixToPostfix = s => {
  let res = "";
  let stack = [];

  // Va de menor importancia a mayor importancia
  let nivelPresedencias = {
    "-": 1,
    "+": 1,
    "*": 2,
    "/": 2
  }

  // Iteramos sobre cada caracter de nuestra expresion
  for (let char of s) {
    // Si es un número, lo agregamos a nuestro string de resultado
    if (!isNaN(parseInt(char))) res += char;
    if (Object.keys(nivelPresedencias).includes(char)) {
      // Nos topamos ocn un operador
      while (stack.length && nivelPresedencias[char] <= nivelPresedencias[stack[stack.length-1]]) {
        res += stack.pop();
      }

      // Agregamos caracter a stack
      stack.push(char);
    }
  }

  while (stack.length) res += stack.pop();

  return res;
}

export const validateString = s => {
  let str = s;
  s = [...s];

  if (!hasValidParentheses(str)) return false;

  // Checar valor inicial y final
  if (s[0] === ")" || isValidOperand(s[0])) return false;
  if (s[s.length-1] === "(" || isValidOperand(s[s.length-1])) return false;

  // Las condicionales se basan en la información de la tabla encontrada en el docuemnto de software
  for (let i = 1; i < s.length-1; i++) {
    let l = s[i-1],
        r = s[i+1],
        curr = s[i];

    // Valor actual es un operados valid
    if (isValidOperand(curr)) {
      if (l === ")" || isDigit(l) && r === "(" || isDigit(r)) {
        continue;
      } else {
        return false;
      }
    }

    // Valor actual es un "("
    if (curr === "(") {
      if (isValidOperand(l) || l === "(" && isDigit(r) || r === "(") {
        continue;
      } else {
        return false;
      }
    }

    // Valor actual es un ")"
    if (curr === ")") {
      if (l === ")" || isDigit(l) && isValidOperand(r) || r === ")") {
        continue;
      } else {
        return false;
      }
    }

    // Valor actual es un digito
    if (isDigit(curr)) {
      if (isValidOperand(l) || l === "(" || isDigit(l) && isValidOperand(r) || r === ")" || isDigit(r)) {
        continue;
      } else {
        return false;
      }
    }
  }

  return true;
}

// Construye el arbol con base a la expresion posfija
export const constructTree = postFixStr => {
  const stringArr = [...postFixStr];
  const stack = [];

  for (const val of stringArr) {
    // Es un numero
    if (parseInt(val)) {
      const newNode = new Node(val);
      stack.push(newNode);
    } else {
      // Es un operador
      const newNode = new Node(val);
      newNode.right = stack.pop()
      newNode.left = stack.pop();
      stack.push(newNode);
    }
  }

  return stack.pop();
}

const isValidOperand = char => ["*", "-", "+", "/"].includes(char);
const isDigit = char => /^\d+$/.test(char);