class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    delete(){
        if(this.currentOperand === ''){
            this.currentOperand = this.previousOperand
            this.previousOperand = ''
            this.operation = undefined
        }
        else
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.'))return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation){
        if(this.currentOperand === '')return
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    compute(){
        const prev = parseFloat(this.previousOperand)
        const curr = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(curr))return
        let computation
        switch(this.operation){
            case '+':
                computation = prev + curr
                break;
            case '-':
                computation = prev - curr
                break;
            case '*':
                computation = prev * curr
                break;
            case '/':
                computation = prev / curr
                break;
            default :
                return
        }
        this.currentOperand = computation
        this.previousOperand = ''
        this.operation = undefined
    }
    getNumberDisplay(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits))integerDisplay=''
        else integerDisplay = parseFloat(integerDigits).toLocaleString('en',{maximumFractionDigits:0})

        if(decimalDigits == null){
            return integerDisplay
        }else{
            return `${integerDisplay}.${decimalDigits}`
        }
    }
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getNumberDisplay(this.currentOperand)
        if(this.operation != null){
            this.previousOperandTextElement.innerText = `${this.getNumberDisplay(this.previousOperand)} ${this.operation}`
        }else{
            this.previousOperandTextElement.innerText = ''
        }
    }
}
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const NUMBER_KEYS = ['1','2','3','4','5','6','7','8','9','.','0']
const OP_KEYS = ['/','*','+','-']
const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)
numberButtons.forEach(button => {
    button.addEventListener('click',()=>enterNumber(button.innerText))
})
operationButtons.forEach(button => {
    button.addEventListener('click',()=>enterOperation(button.innerText))
})
allClearButton.addEventListener('click',allClear)
deleteButton.addEventListener('click',deletePress)
equalsButton.addEventListener('click',equalsPress)
function enterNumber(number){
    playAudio()
    calculator.appendNumber(number)
    calculator.updateDisplay()
}
function enterOperation(operation){
    playAudio()
    calculator.chooseOperation(operation)
    calculator.updateDisplay()
}
function allClear(){
    playAudio()
    calculator.clear()
    calculator.updateDisplay()
}
function deletePress(){
    playAudio()
    calculator.delete()
    calculator.updateDisplay()
}
function equalsPress(){
    playAudio()
    calculator.compute()
    calculator.updateDisplay()
}
function playAudio(){
    const audio = document.querySelector('audio')
    audio.currentTime = 0
    audio.play()
}
console.log(numberButtons);
document.addEventListener('keydown',(e)=>{
    const key = e.key
    const numberKeyIndex = NUMBER_KEYS.indexOf(key)
    const opKeyIndex = OP_KEYS.indexOf(key)
    if(numberKeyIndex>-1){
        enterNumber(key)
    }
    if(opKeyIndex>-1){
        enterOperation(key)
    }
    if(key === 'Backspace'){
        deletePress()
    }
    if(key === 'Enter' || key === '='){
        equalsPress()
    }
    if(key === 'Escape'){
        allClear()
    }
})
