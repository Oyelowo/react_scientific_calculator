import React, {Component} from 'react';
import './calculatorContainer.css';

class CalculatorContainer extends Component {
    state = {
        calculatorKeysArray: [
            {
                name: 'COS',
                id: 'cos',
                buttonColor: 'black',
                value: 'cos'
            }, {
                name: 'TAN',
                id: 'tan',
                buttonColor: 'black',
                value: 'tan'
            }, {
                name: 'SIN',
                id: 'sin',
                buttonColor: 'black',
                value: 'sin'
            }, {
                name: '(-)',
                id: 'plusOrMinus',
                buttonColor: 'black',
                value: '-'
            }, {
                name: 'ABS',
                id: 'abs',
                buttonColor: 'black',
                value: 'abs'
            }, {
                name: '√',
                id: 'squareRoot',
                buttonColor: 'black',
                value: '√'
            }, {
                name: 'SQR',
                id: 'square',
                buttonColor: 'black',
                value: '^2'
            }, {
                name: '^',
                id: 'raiseToPower',
                buttonColor: 'black',
                value: '**'
            }, {
                name: 'LOG',
                id: 'log',
                buttonColor: 'black',
                value: 'log'
            }, {
                name: 'ln',
                id: 'ln',
                buttonColor: 'black',
                value: 'ln'
            }, {
                name: 'CLR',
                id: 'clr',
                buttonColor: 'black',
                value: 'clr'
            }, {
                name: '(',
                id: 'openParanthesis',
                buttonColor: 'black',
                value: '('
            }, {
                name: ')',
                id: 'closedParanthesis',
                buttonColor: 'black',
                value: ')'
            }, {
                name: 'M+',
                id: 'memory',
                buttonColor: 'black',
                value: 'M+',
            }, {
                name: 'MOD',
                id: 'modulus',
                buttonColor: 'black',
                value: '%'
            }, {
                name: '7',
                id: '7',
                buttonColor: 'grey',
                value: '7'
            }, {
                name: '8',
                id: '8',
                buttonColor: 'grey',
                value: '8'
            }, {
                name: '9',
                id: '9',
                buttonColor: 'grey',
                value: '9'
            }, {
                name: 'DEL',
                id: 'del',
                buttonColor: 'red',
                value: 'del'
            }, {
                name: 'EXIT',
                id: 'exit',
                buttonColor: 'red',
                value: 'exit'
            }, {
                name: '4',
                id: '4',
                buttonColor: 'grey',
                value: '4'
            }, {
                name: '5',
                id: '5',
                buttonColor: 'grey',
                value: '5'
            }, {
                name: '6',
                id: '6',
                buttonColor: 'grey',
                value: '6' 
            }, {
                name: 'X',
                id: 'multiply',
                buttonColor: 'grey',
                value: '*'
            }, {
                name: '/',
                id: 'divide',
                buttonColor: 'grey',
                value: '/'
            }, {
                name: '1',
                id: '1',
                buttonColor: 'grey',
                value: '1'
            }, {
                name: '2',
                id: '2',
                buttonColor: 'grey',
                value: '2'
            }, {
                name: '3',
                id: '3',
                buttonColor: 'grey',
                value: '3'
            }, {
                name: '+',
                id: 'add',
                buttonColor: 'grey',
                value: '+'
            }, {
                name: '-',
                id: 'subtract',
                buttonColor: 'grey',
                value: '-'
            }, {
                name: '0',
                id: '0',
                buttonColor: 'grey',
                value: '0'
            }, {
                name: '.',
                id: 'decimal',
                buttonColor: 'grey',
                value: '.'
            }, {
                name: 'EXP',
                id: 'exponential',
                buttonColor: 'grey',
                value: 'exp'
            }, {
                name: 'Pi',
                id: 'pi',
                buttonColor: 'grey',
                value: 'pi'
            }, {
                name: '=',
                id: 'equalTo',
                buttonColor: 'grey',
                value: '='
            }

        ],

        inputValue: '',
        result: ''
    }

    isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n)


inputValueHandler = (event) => {
    let {inputValue} = this.state
    const OPERATORS = /[+-/*^]/;
    if (this.isNumber(event.target.value) || OPERATORS.test(event.target.value)) {
        this.setState({
            inputValue: inputValue + event.target.value
        })
    } else if(event.target.value == '=') {
        this.setState({inputValue: eval(inputValue)})
    }
    else if(event.target.value== 'pi'){
        this.setState({inputValue: Math.PI})
    }
}

render() {
    const {calculatorKeysArray} = this.state;

    let calculatorKeys = calculatorKeysArray.map((calcKey) => (
        <span key={calcKey.id}><input
            onClick={this.inputValueHandler}
            className={`button ${calcKey.buttonColor}`}
            type="button"
            value={calcKey.value}/></span>
    ));

    return (
        <div className='container'>
            <div className='calculatorScreen'><input
                type="text"
                size="20"
                id="screen"
                value={this.state.inputValue}
                readOnly/></div>
            <div id='buttons'>{calculatorKeys}</div>
        </div>

    );
}
}

export default CalculatorContainer;
