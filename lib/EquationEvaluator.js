"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EquationEvaluator = /** @class */ (function () {
    function EquationEvaluator(stringToEval, params) {
        this.stringToEval = stringToEval;
        this.params = params;
    }
    EquationEvaluator.prototype.evaluate = function () {
        var eVal = '';
        try {
            var parsedParamsEquation = this.parseParams(this.params, this.stringToEval);
            var parsedEquation = this.parseEquation(parsedParamsEquation);
            var randomString = (Math.random() + 1).toString(36).substring(7).toUpperCase();
            var functionName = "_".concat(randomString);
            var functionString = "function ".concat(functionName, "() {").concat(parsedEquation, "}; ").concat(functionName, "();");
            eVal = eval(functionString);
        }
        catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }
        }
        return eVal;
    };
    EquationEvaluator.prototype.parseEquation = function (equation) {
        var eValEqaution = '';
        try {
            eValEqaution = equation.replaceAll(' = ', ' == ');
            eValEqaution = eValEqaution.replaceAll(' and ', ' && ');
            eValEqaution = eValEqaution.replaceAll(' or ', ' || ');
            eValEqaution = this.parseString(eValEqaution);
        }
        catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }
        }
        return eValEqaution;
    };
    EquationEvaluator.prototype.parseString = function (str) {
        var parsedBlock = '';
        try {
            var match = str.match(/if(.+)then/i);
            if (!match)
                throw new Error('invalid string to parse');
            var condition = str.match(/if(.+)then/i)[1].trim();
            var conditionWithParentheses = "(".concat(condition, ")");
            var parsedStr = str.replace(condition, conditionWithParentheses);
            parsedBlock = this.parseBlock(parsedStr);
        }
        catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }
        }
        return parsedBlock;
    };
    EquationEvaluator.prototype.parseBlock = function (str) {
        var outputStr = '';
        try {
            var ifIndex = str.indexOf('if');
            var thenIndex = str.indexOf('then');
            var elseIndex = str.indexOf('else');
            var condition = str.slice(ifIndex + 2, thenIndex).trim();
            var thenValue = str.slice(thenIndex + 4, elseIndex).trim();
            var elseValue = str.slice(elseIndex + 4).trim();
            outputStr = "if (".concat(condition, ") { ").concat(thenValue, "; } else { ").concat(elseValue, "; }");
        }
        catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }
        }
        return outputStr;
    };
    EquationEvaluator.prototype.parseParams = function (params, stringToEval) {
        try {
            for (var key in params) {
                var value = params[key];
                stringToEval = stringToEval.replaceAll(":".concat(key), "'".concat(value, "'"));
            }
            stringToEval = stringToEval.toLowerCase();
            return stringToEval;
        }
        catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }
        }
        return stringToEval;
    };
    return EquationEvaluator;
}());
exports.default = EquationEvaluator;
