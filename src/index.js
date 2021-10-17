const { tokenize } = require('./tokenizer');
const { interpretRoot } = require("./interpreter");

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

(async () => {
  while (true) {
    await new Promise((resolve) => {
      readline.question("expression: ", (input) => {
        if (!input) {
          return;
        }

        try {
          const tokens = tokenize(input);
          const result = interpretRoot(tokens);
          console.log("result:", result);
        } catch (e) {
          console.error(`failed expression "${input}": ${e}`);
        }
        console.log("");
        resolve();
      });
    });
  }
})();