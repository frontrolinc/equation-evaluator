export default class EquationEvaluator {
  private readonly stringToEval: string;
  private readonly params: Record<string, string>;

  constructor(stringToEval: string, params: Record<string, string>) {
    this.stringToEval = stringToEval;
    this.params = params;
  }

  public evaluate(): string {
    let eVal: string = '';
    try {
      const parsedParamsEquation = this.parseParams(this.params, this.stringToEval);
      const parsedEquation = this.parseEquation(parsedParamsEquation);
      const randomString = (Math.random() + 1).toString(36).substring(7).toUpperCase();
      const functionName = `_${randomString}`;
      const functionString = `function ${functionName}() {${parsedEquation}}; ${functionName}();`;
      eVal = eval(functionString);
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
    return eVal;
  }

  private parseEquation(equation: any): string {
    let eValEqaution: any = '';
    try {
      eValEqaution = equation.replaceAll(' = ', ' == ');
      eValEqaution = eValEqaution.replaceAll(' and ', ' && ');
      eValEqaution = eValEqaution.replaceAll(' or ', ' || ');
      eValEqaution = this.parseString(eValEqaution);
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    } 
    return eValEqaution;
  }

  private parseString(str: any): string {
    let parsedBlock: string = '';
    try {
      const match = str.match(/if(.+)then/i);
      if (!match) throw new Error('invalid string to parse');
      const condition = str.match(/if(.+)then/i)[1].trim();
      const conditionWithParentheses = `(${condition})`;
      const parsedStr = str.replace(condition, conditionWithParentheses);
      parsedBlock = this.parseBlock(parsedStr);
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
    return parsedBlock;
  }

  private parseBlock(str: string): string {
    let outputStr: string = '';
    try {
      const ifIndex = str.indexOf('if');
      const thenIndex = str.indexOf('then');
      const elseIndex = str.indexOf('else');
      const condition = str.slice(ifIndex + 2, thenIndex).trim();
      const thenValue = str.slice(thenIndex + 4, elseIndex).trim();
      const elseValue = str.slice(elseIndex + 4).trim();
      outputStr = `if (${condition}) { ${thenValue}; } else { ${elseValue}; }`;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
    return outputStr;
  }

  private parseParams(params: Record<string, string>, stringToEval: any): string {
    try {
      for (const key in params) {
        const value = params[key];
        stringToEval = stringToEval.replaceAll(`:${key}`, `'${value}'`);
      }
      stringToEval = stringToEval.toLowerCase();
      return stringToEval;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
    return stringToEval;
  }
}