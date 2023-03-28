import { EquationEvaluator } from '../src/index';

test('Should return "success"', () => {

    const stringToEval = `If :A = 'submitted' AND :B = 'Baselined' AND :C = 'Complete' THEN RETURN "Success" ELSE RETURN "Error"`;
    const params = {
        'A': 'submitted',
        'B': 'Baselined',
        'C': 'Complete'
    }
    const equation = new EquationEvaluator(stringToEval, params);
    const result = equation.evaluate();

    expect(result).toBe('success');
});

test('Should return "error"', () => {

    const stringToEval = `If :A = 'submitted' AND :B = 'Baselined' AND :C = 'Complete' THEN RETURN "Success" ELSE RETURN "Error"`;
    const params = {
        'A': 'submitted11',
        'B': 'Baselined',
        'C': 'Complete'
    }
    const equation = new EquationEvaluator(stringToEval, params);
    const result = equation.evaluate();

    expect(result).toBe('error');
});