# Javascript Calculator

Code to tokenize and interpret mathematical expressions similarily to a default calculator app. 

## Explaining the pipeline

For the sake of education, I wanted to write up the reasons why the code is structured as it is. While the parts are separate, and you can read only the headings that interest you, I do want to recommend to stick for the full readme. It might give you some better insight.

### Input

There's not too much to say from the input. Any string of text will work. However your text needs to be a proper mathematical expression. e.g. `1+1` is valid, but, `hello+3` is not. This is because identifiers (e.g. variables) are not supported as of the time of writing this. Neither are multiple expressions.

### Tokenizing

Assuming an expression from a single string does not make much sense, to solve this: we categorize each part of the expression. For example `1+1` becomes `Number(1) Add Number(1)`. While interpreting it is a lot easier to go over categories of tokens over an array of characters. This is because we delete any unneeded information. (e.g. spaces, tabs)

### Interpreting

The pros of trying to intrepret mathematical expressions is that we already have a rulebook set in place. we know Multiplication/Division happen before Addition/Subtraction, and we need to take this into account when we create results. 

How do we do that? We can use checks when we read a number or expression to see what is going to happen with that number in the long term. An example would be `1 + 1 * 2`. To read this expression the following steps occur.

```
Perform Addition:
 - Read Number (1)     [next: Add]
   - Is the next operation happening multiplication/division? No
   - Is the operation happening addition/subtraction? Yes
   - Return (1)
 - Read Operator (Add) [next: Number(1)]
 - Read Number (1)     [next: Multiply]
   - Is the next operation happening multiplication/division? Yes
   - Perform Multiplication(1 * 2)
   - Return (2)
 - Return(3)
```
