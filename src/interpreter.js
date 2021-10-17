const { tokenType } = require("./tokenizer");

/**
 * @param {Token[]} tokens
 */
const peek = (tokens) => {
  return tokens[0];
};

/**
 * @param {Token[]} tokens
 */
const skip = (tokens) => {
  tokens.shift();
};

/**
 * @param {Token[]} tokens
 */
const take = (tokens, type) => {
  const token = tokens.shift();
  assert(token, type);
  return token;
};

const assert = (token, type) => {
  if (!type) {
    return;
  }

  if (token.type != type) {
    throw new Error(`Expected token of type ${type}, got ${token.type}`);
  }
};

/**
 * @param {Token[]} tokens 
 * @returns 
 */
const interpretRoot = (tokens) => {
  const result = interpretExpression(tokens);
  const token = peek(tokens);

  if (token.type == tokenType.EndOfInput) {
    return result;
  }

  tokens.unshift({
    type: tokenType.Number,
    value: result,
  });
  return interpretRoot(tokens);
};

const interpretExpression = (tokens) => {
  return interpretFactor(tokens);
};

const interpretFactor = (tokens) => {
  const a = interpretTerm(tokens);
  const op = peek(tokens);

  if (op.type == tokenType.Multiply) {
    console.log("multiply");
    skip(tokens);
    const b = interpretFactor(tokens);
    return a * b;
  }

  if (op.type == tokenType.Divide) {
    console.log("divide");
    skip(tokens);
    const b = interpretFactor(tokens);
    return a / b;
  }

  return a;
};


const interpretTerm = (tokens) => {
  const a = interpretPrimitive(tokens);
  const op = peek(tokens);

  if (op.type == tokenType.Add) {
    console.log("add");
    skip(tokens);
    const b = interpretFactor(tokens);
    return a + b;
  }

  if (op.type == tokenType.Subtract) {
    console.log("sub");
    skip(tokens);
    const b = interpretFactor(tokens);
    return a - b;
  }

  return a;
};

const interpretPrimitive = (tokens) => {
  const a = take(tokens);
  if (a.type === tokenType.OpenParenthesis) {
    const value = interpretExpression(tokens);
    take(tokens, tokenType.CloseParenthesis);
    return value;
  }
  assert(a, tokenType.Number);
  console.log(a.value);
  return Number(a.value);
};

module.exports = {
  interpretRoot,
}