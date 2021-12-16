const store = require("./store");
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
  let result = interpretStatement(tokens);

  const currentToken = peek(tokens);
  if (currentToken.type != tokenType.EndOfInput) {
    throw new Error("Expected end of input, got " + currentToken.type);
  }

  return result
};

const interpretStatement = (tokens) => {
  const token = peek(tokens);

  if (token.type == tokenType.Let) {
    skip(tokens);
    const identifier = take(tokens, tokenType.Identifier);
    take(tokens, tokenType.Assign);
    const value = interpretExpression(tokens);
    store.set(identifier.value, value);
    return value;
  }

  return interpretExpression(tokens);
};

/**
 * @param {Token[]} tokens 
 * @returns {number}
 */
const interpretExpression = (tokens) => {
  return interpretFactor(tokens);
};

/**
 * @param {Token[]} tokens 
 * @returns {number}
 */
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

/**
 * @param {Token[]} tokens 
 * @returns {number}
 */
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

/**
 * @param {Token[]} tokens 
 * @returns {number}
 */
const interpretPrimitive = (tokens) => {
  const a = take(tokens);
  if (a.type === tokenType.OpenParenthesis) {
    const value = interpretExpression(tokens);
    take(tokens, tokenType.CloseParenthesis);
    return value;
  }

  if (a.type === tokenType.Identifier) {
    const value = store.get(a.value);
    if (value == null || value == undefined) {
      throw new Error("Undefined stored variable: " + a.value);
    }
    console.log(`identifier(${a.value})`, value);
    return Number(value);
  }

  assert(a, tokenType.Number);
  console.log(a.value);
  return Number(a.value);
};

module.exports = {
  interpretRoot,
}