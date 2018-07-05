import React, {Component} from 'react';
import './calculatorContainer.css';

class CalculatorContainer extends Component {
    state = {
        calculatorKeysArray: [
            {
                name: 'COS',
                id: 'cos',
                buttonColor: 'black'
            }, {
                name: 'TAN',
                id: 'tan',
                buttonColor: 'black'
            }, {
                name: 'SIN',
                id: 'sin',
                buttonColor: 'black'
            }, {
                name: '(-)',
                id: 'plusOrMinus',
                buttonColor: 'black'
            }, {
                name: 'ABS',
                id: 'abs',
                buttonColor: 'black'
            }, {
                name: '√',
                id: 'squareRoot',
                buttonColor: 'black'
            }, {
                name: 'SQR',
                id: 'square',
                buttonColor: 'black'
            }, {
                name: '^',
                id: 'raiseToPower',
                buttonColor: 'black'
            }, {
                name: 'LOG',
                id: 'log',
                buttonColor: 'black'
            }, {
                name: 'ln',
                id: 'ln',
                buttonColor: 'black'
            }, {
                name: 'CLR',
                id: 'clr',
                buttonColor: 'black'
            }, {
                name: '(',
                id: 'openParanthesis',
                buttonColor: 'black'
            }, {
                name: ')',
                id: 'closedParanthesis',
                buttonColor: 'black'
            }, {
                name: 'M+',
                id: 'memory',
                buttonColor: 'black'
            }, {
                name: 'MOD',
                id: 'modulus',
                buttonColor: 'black'
            }, {
                name: '7',
                id: '7',
                buttonColor: 'grey'
            }, {
                name: '8',
                id: '8',
                buttonColor: 'grey'
            }, {
                name: '9',
                id: '9',
                buttonColor: 'grey'
            }, {
                name: 'DEL',
                id: 'del',
                buttonColor: 'red'
            }, {
                name: 'EXIT',
                id: 'exit',
                buttonColor: 'red'
            }, {
                name: '4',
                id: '4',
                buttonColor: 'grey'
            }, {
                name: '5',
                id: '5',
                buttonColor: 'grey'
            }, {
                name: '6',
                id: '6',
                buttonColor: 'grey'
            }, {
                name: 'X',
                id: 'multiply',
                buttonColor: 'grey'
            }, {
                name: '/',
                id: 'divide',
                buttonColor: 'grey'
            }, {
                name: '1',
                id: '1',
                buttonColor: 'grey'
            }, {
                name: '2',
                id: '2',
                buttonColor: 'grey'
            }, {
                name: '3',
                id: '3',
                buttonColor: 'grey'
            }, {
                name: '+',
                id: 'add',
                buttonColor: 'grey'
            }, {
                name: '-',
                id: 'subtract',
                buttonColor: 'grey'
            }, {
                name: '0',
                id: '0',
                buttonColor: 'grey'
            }, {
                name: '.',
                id: 'period',
                buttonColor: 'grey'
            }, {
                name: 'EXP',
                id: 'exponential',
                buttonColor: 'grey'
            }, {
                name: 'Pi',
                id: 'pi',
                buttonColor: 'grey'
            }, {
                name: '=',
                id: 'equalTo',
                buttonColor: 'grey'
            }

        ]
    }
    render() {
        const {calculatorKeysArray} = this.state;

        let calculatorKeys = calculatorKeysArray.map((calcKey, i, arr) => {
           
            return (
                <span key={calcKey.id}><input
                    className={`button ${calcKey.buttonColor}`}
                    type="button"
                    value={calcKey.name}/></span>
            )
        })
        return (
            <div className='container'>
                <div className='calculatorScreen'><input type="text" size="20" id="screen" readOnly/></div>
                <div id='buttons'>{calculatorKeys}</div>
            </div>

        );
    }
}

export default CalculatorContainer;
