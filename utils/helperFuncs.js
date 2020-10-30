const hasValidParentheses = s => {
  const mappedVals = {
    "(": ")"
  }
  let stack = [];

  // Remove everything that's not a ( or )
  s = [...s].filter(s => s === "(" || s === ")").join("");
  // console.log(s);

  for (let i = 0; i < s.length; i++) {
      if (mappedVals[s[i]]) stack.push(mappedVals[s[i]]);
      else if (s[i] !== stack.pop()) return false;
  }

  return stack.length === 0;
}

// http://csis.pace.edu/~wolf/CS122/infix-postfix.htm
export const infixToPostfix = s => {
  let res = "";
  let stack = [];

  // Va de menor importancia a mayor importancia
  // let nivelPresedencias = ["-", "+", "*", "/"];
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

  console.log(s);

  // Checar valor inicial y final
  if (s[0] === ")" || isValidOperand(s[0])) return false;
  if (s[s.length-1] === "(" || isValidOperand(s[s.length-1])) return false;

  for (let i = 1; i < s.length-1; i++) {
    let l = s[i-1],
        r = s[i+1],
        curr = s[i];
      
    console.log(i, "curr: ", curr, typeof curr);

    // Valor actual es un operados valid
    if (isValidOperand(curr)) {
      console.log("curr is op with: ", l, curr, r);

      if (l === ")" || isDigit(l) && r === "(" || isDigit(r)) {
        continue;
      } else {
        return false;
      }
    }

    // Valor actual es un "("
    if (curr === "(") {
      console.log("curr is ( with: ", l, curr, r);      

      if (isValidOperand(l) || l === "(" && isDigit(r) || r === "(") {
        continue;
      } else {
        return false;
      }
    }

    // Valor actual es un ")"
    if (curr === ")") {
      console.log("curr is ) with: ", l, curr, r);

      if (l === ")" || isDigit(l) && isValidOperand(r) || r === ")") {
        continue;
      } else {
        return false;
      }
    }

    // Valor actual es un digito
    if (isDigit(curr)) {
      console.log("curr is digit with: ", l, curr, r);

      if (isValidOperand(l) || l === "(" || isDigit(l) && isValidOperand(r) || r === ")" || isDigit(r)) {
        continue;
      } else {
        return false;
      }
    }
  }

  return true;
}

const isValidOperand = char => ["*", "-", "+", "/"].includes(char);
const isDigit = char => /^\d+$/.test(char);