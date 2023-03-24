export default class EquationEvaluator {
    private readonly stringToEval;
    private readonly params;
    constructor(stringToEval: string, params: Record<string, string>);
    evaluate(): string;
    private parseEquation;
    private parseString;
    private parseBlock;
    private parseParams;
}
