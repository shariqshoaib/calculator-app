class Calculator{

    constructor(previousText, currentText){
        this.previousText = previousText;
        this.currentText = currentText;
        this.operation = '';
        this.result = '';
        this.clearAll();
    }

    clearAll(){
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = '';
        this.updateDisplay();
    }

    appendCurrentNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand += number.toString();
    }

    setOperation(operation){
        if(this.currentOperand === '') return;
        if(this.operation !== '') {this.computeOperatorSolution(operation); return;};
        this.previousOperand = this.currentOperand;
        this.operation = operation;
        this.currentOperand = '';
    }

    delete(){
        this.currentOperand = this.currentOperand.slice(0, -1);
    }

    compute(){
        if(this.previousOperand === '' || this.currentOperand === '') return;
        const parseCurrent = parseFloat(this.currentOperand);
        const parsePervious = parseFloat(this.previousOperand);
        switch(this.operation){
            case '+':
                this.result = parsePervious + parseCurrent;
                break;
            case '-':
                this.result = parsePervious - parseCurrent;
                break;
            case '*':
                this.result = parsePervious * parseCurrent;
                break;
            case '÷':
                this.result = parsePervious / parseCurrent;
                break;
            default:
                return;
        }
    }

    computeOperatorSolution(operation){
        this.compute();
        this.operation = operation;
        this.currentOperand = '';
        this.previousOperand = this.result;
        this.updateDisplay();
    }

    computeSolution(){
        this.compute();
        this.currentOperand = this.result.toString();
        this.previousOperand = '';
        this.operation = '';
        this.updateDisplay();
    }

    updateDisplay(){
        this.previousText.innerText = `${this.previousOperand}${this.operation}`;
        this.currentText.innerText = this.currentOperand;
    }

}

const numberButtons = document.querySelectorAll('[data-numbers]');
const operationsButtons = document.querySelectorAll('[data-operations');
const currentOperandText = document.querySelector('[data-current-operand]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const allClearButton =document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const solutionButton = document.querySelector('[data-solution]');

const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach( function(button){
    button.addEventListener('click', () =>{
        calculator.appendCurrentNumber(button.innerText)
        calculator.updateDisplay();
    })
})

operationsButtons.forEach( function(button){
    button.addEventListener('click', () =>{
        calculator.setOperation(button.innerText);
        calculator.updateDisplay();
    })
})

allClearButton.addEventListener('click', function(){
    calculator.clearAll();
})

deleteButton.addEventListener('click', function(){
    calculator.delete();
    calculator.updateDisplay();
})

solutionButton.addEventListener('click', function(){
    calculator.computeSolution();
})
