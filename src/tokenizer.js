/**
 * @typedef {{
 *  type: string,
 *  value?: number,
 * }} Token
 */

const tokenType = {
  OpenParenthesis: "OPEN_PAREN",
  CloseParenthesis: "CLOSE_PAREN",
  Number: "NUMBER",
  Add: "ADD",
  Subtract: "SUBTRACT",
  Multiply: "MULTIPLY",
  Divide: "DIVIDE",
  Whitespace: "WHITESPACE",
  EndOfInput: "END_OF_INPUT",
  Identifier: "IDENTIFIER",
  Assign: "ASSIGN",
  Let: "LET",
};

const tokenizerReaders = {
  "^\\d+": tokenType.Number,
  "^\\*": tokenType.Multiply,
  "^\\+": tokenType.Add,
  "^\\-": tokenType.Subtract,
  "^\\(": tokenType.OpenParenthesis,
  "^\\)": tokenType.CloseParenthesis,
  "^\\/": tokenType.Divide,
  "^let": tokenType.Let,
  "^=": tokenType.Assign,
  "^[a-zA-Z][a-zA-Z0-9]*": tokenType.Identifier,
}

/**
 * Tokenizes input string into usable tokens for the interpreter.
 * 
 * @param {string} input 
 * @returns {Token[]} tokenized version of input
 */
const tokenize = (input) => {
  const outputTokens = [];
  let i = 0;
  while (i < input.length) {
    let token = null;
    let match = null;
    for (const regex of Object.keys(tokenizerReaders)) {
      const regexMatch = input.slice(i).match(new RegExp(regex));
      if (regexMatch) {
        match = regexMatch;
        token = tokenizerReaders[regex];
        break;
      }
    };

    if (token) {
      outputTokens.push({
        type: token,
        value: match[0],
      });
      i += match[0].length;
    } else {
      i++;
    }
  }

  outputTokens.push({
    type: tokenType.EndOfInput,
  })
  return outputTokens
}

module.exports = {
  tokenType,
  tokenize,
}