import React, {Component} from 'react';
import './calculatorContainer.css';
import { MathInDegree } from '../../utility/utility';


class CalculatorContainer extends Component {
    state = {
        calculatorKeysArray: [
            {
                inputValue: 'COS',
                id: 'cos',
                buttonColor: 'black',
                inputOperator: 'cos'
            }, {
                inputValue: 'TAN',
                id: 'tan',
                buttonColor: 'black',
                inputOperator: 'tan'
            }, {
                inputValue: 'SIN',
                id: 'sin',
                buttonColor: 'black',
                inputOperator: 'sin'
            }, {
                inputValue: '(-)',
                id: 'plusOrMinus',
                buttonColor: 'black',
                inputOperator: '-'
            }, {
                inputValue: 'ABS',
                id: 'abs',
                buttonColor: 'black',
                inputOperator: 'abs'
            }, {
                inputValue: '√',
                id: 'squareRoot',
                buttonColor: 'black',
                inputOperator: '√'
            }, {
                inputValue: 'SQR',
                id: 'square',
                buttonColor: 'black',
                inputOperator: '^2'
            }, {
                inputValue: '^',
                id: 'raiseToPower',
                buttonColor: 'black',
                inputOperator: '**'
            }, {
                inputValue: 'LOG',
                id: 'log',
                buttonColor: 'black',
                inputOperator: 'log'
            }, {
                inputValue: 'ln',
                id: 'ln',
                buttonColor: 'black',
                inputOperator: 'ln'
            }, {
                inputValue: 'CLR',
                id: 'clr',
                buttonColor: 'black',
                inputOperator: 'clr'
            }, {
                inputValue: '(',
                id: 'openParanthesis',
                buttonColor: 'black',
                inputOperator: '('
            }, {
                inputValue: ')',
                id: 'closedParanthesis',
                buttonColor: 'black',
                inputOperator: ')'
            }, {
                inputValue: 'M+',
                id: 'memory',
                buttonColor: 'black',
                inputOperator: 'M+'
            }, {
                inputValue: 'MOD',
                id: 'modulus',
                buttonColor: 'black',
                inputOperator: '%'
            }, {
                inputValue: '7',
                id: '7',
                buttonColor: 'grey',
                inputOperator: '7'
            }, {
                inputValue: '8',
                id: '8',
                buttonColor: 'grey',
                inputOperator: '8'
            }, {
                inputValue: '9',
                id: '9',
                buttonColor: 'grey',
                inputOperator: '9'
            }, {
                inputValue: 'DEL',
                id: 'del',
                buttonColor: 'red',
                inputOperator: 'del'
            }, {
                inputValue: 'EXIT',
                id: 'exit',
                buttonColor: 'red',
                inputOperator: 'exit'
            }, {
                inputValue: '4',
                id: '4',
                buttonColor: 'grey',
                inputOperator: '4'
            }, {
                inputValue: '5',
                id: '5',
                buttonColor: 'grey',
                inputOperator: '5'
            }, {
                inputValue: '6',
                id: '6',
                buttonColor: 'grey',
                inputOperator: '6'
            }, {
                inputValue: 'X',
                id: 'multiply',
                buttonColor: 'grey',
                inputOperator: '*'
            }, {
                inputValue: '/',
                id: 'divide',
                buttonColor: 'grey',
                inputOperator: '/'
            }, {
                inputValue: '1',
                id: '1',
                buttonColor: 'grey',
                inputOperator: '1'
            }, {
                inputValue: '2',
                id: '2',
                buttonColor: 'grey',
                inputOperator: '2'
            }, {
                inputValue: '3',
                id: '3',
                buttonColor: 'grey',
                inputOperator: '3'
            }, {
                inputValue: '+',
                id: 'add',
                buttonColor: 'grey',
                inputOperator: '+'
            }, {
                inputValue: '-',
                id: 'subtract',
                buttonColor: 'grey',
                inputOperator: '-'
            }, {
                inputValue: '0',
                id: '0',
                buttonColor: 'grey',
                inputOperator: '0'
            }, {
                inputValue: '.',
                id: 'decimal',
                buttonColor: 'grey',
                inputOperator: '.'
            }, {
                inputValue: 'EXP',
                id: 'exponential',
                buttonColor: 'grey',
                inputOperator: 'exp'
            }, {
                inputValue: 'PI',
                id: 'pi',
                buttonColor: 'grey',
                inputOperator: Math.PI
            }, {
                inputValue: '=',
                id: 'equalTo',
                buttonColor: 'grey',
                inputOperator: '='
            }

        ],

        inputValue: '',
        result: ''
    }

    isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n)

    inputValueHandler = (event) => {
        let {inputValue} = this.state;
        // const OPERATORS = /[+-/*^.]/;
        const OPERATORS = "+-/*^.()";
        if (this.isNumber(event.target.value) || OPERATORS.includes(event.target.name)) {
            this.setState({
                inputValue: inputValue + event.target.name
            })
            // if(inputValue.endsWith("+")){
            //     this.setState({
            //         inputValue: inputValue
            //     })
            // }
        } 
        else if (event.target.value == '=') {
            this.setState({inputValue: eval(inputValue)})
        } else if (event.target.value == 'PI') {
            this.setState({inputValue:inputValue + (Math.PI).toFixed(2)})
            if(inputValue.endsWith((Math.PI).toFixed(2))){
                this.setState({inputValue: (Math.PI).toFixed(2)})
            }
        } else if(event.target.value == 'COS'){
            this.setState({inputValue: Math.cos(inputValue)})
        }  else if(event.target.value == 'SIN'){
            this.setState({inputValue: Math.sin(inputValue)})
        } else if(event.target.value == 'TAN'){
            this.setState({inputValue: Math.tan(inputValue)})
        }
    }

    render() {
        const {calculatorKeysArray} = this.state;

        let calculatorKeys = calculatorKeysArray.map((calcKey) => (
            <span key={calcKey.id}><input
                onClick={this.inputValueHandler}
                className={`button ${calcKey.buttonColor}`}
                type="button"
                name={calcKey.inputOperator}
                value={calcKey.inputValue}/></span>
        ));
        console.log(MathInDegree.sin(60))

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
