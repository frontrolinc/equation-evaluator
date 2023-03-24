# EquationEvaluator

#### The EquationEvaluator is a TypeScript class that allows you to evaluate simple equations written in a specific syntax. The syntax supports boolean operators such as AND, OR, and conditional statements such as IF and ELSE.

  

## Installation

To use this class in your project, you can install it from npm:

    npm install equation-evaluator

## Usage

You can import the EquationEvaluator class in your TypeScript code as follows:

  

#### typescript

    import EquationEvaluator from "equation-evaluator/lib/EquationEvaluator";
    
    const equation = `IF :A = 'submitted' AND :B = 'Baselined' AND :C = 'Complete' THEN RETURN "Success" ELSE RETURN "Error"`;
    
    const params = {
        'A': 'submitted',
        'B': 'Baselined',
        'C': 'Complete'
    }
    
    const evaluator = new EquationEvaluator(equation, params);
    const result = evaluator.evaluate();
    console.log(result); // "Success"

In the above example, we create a new instance of the EquationEvaluator class with the equation and parameters we want to evaluate. We then call the evaluate method on the evaluator object to get the result.

  

### Syntax

The supported syntax for the equation string is as follows:

 - To define a variable in the equation, use the : symbol followed by
   the variable name (e.g., :A).
  
 - To compare a variable with a value, use the = symbol (e.g., :A =   
   'submitted').
   
 - To combine conditions, use the AND or OR operator (e.g., :A =   
   'submitted' AND :B = 'Baselined').

 - To define a conditional statement, use the IF keyword followed by a  
   condition, then the THEN keyword and a value to return if the   
   condition is true, and optionally the ELSE keyword and a value to   
   return if the condition is false (e.g., IF :A = 'submitted' AND :B = 
   'Baselined' THEN RETURN "Success" ELSE RETURN "Error").

### License

This project is licensed under the MIT License. See the LICENSE file for details.
