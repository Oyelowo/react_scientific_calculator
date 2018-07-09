import React, {Component} from 'react';
import './calculatorContainer.css';
import {MathInDegree, isNumber} from '../../utility/utility';
import {calculatorKeysArray, calculatorKeysArrayInverse} from '../../calculatorInputButtons/calculatorInputButtons';

class CalculatorContainer extends Component {
    state = {
        calculatorKeysArray,
        calculatorKeysArrayInverse,
        inputValue: '',
        trigsAreInverse: false
    }

    inputValueHandler = (event) => {
        let {inputValue} = this.state;

        // inputValue= inputValue.replace(/^0+(?!\.|$)/, '')
        const operatorsRegex = /[+-/*^.]/;
        // let shownInputs = "+-/*^.";
        const {value, name} = event.target
        if (isNumber(value) || operatorsRegex.test(name)) {
            inputValue = inputValue === '0' && name !== '.'
                ? ''
                : inputValue;
            let myName = name === '.' && inputValue.includes('.')
                ? ''
                : name;
            let updatedInputValue = inputValue + myName;
            this.setState({inputValue: updatedInputValue})

            if (!isNumber(value) && operatorsRegex.test(inputValue.toString().slice(-1))) {
                updatedInputValue = inputValue.slice(0, -1) + name
                this.setState({inputValue: updatedInputValue})
            }

        } else if (value === '(' || value === ')') {
            this.setState({
                inputValue: inputValue + value
            })
        } else if (value === '=') {
            // eslint-disable-next-line
            this.setState({inputValue: eval(inputValue)})
        } else if (value === 'PI') {
            this.setState({
                inputValue: inputValue + (Math.PI).toFixed(2)
            })

            if (inputValue.endsWith((Math.PI).toFixed(2))) {
                this.setState({
                    inputValue: (Math.PI).toFixed(2)
                })
            }
        } else if (value === 'AC') {
            this.setState({inputValue: '0'})
        } else if (value === 'COS') {
            this.setState({
                inputValue: MathInDegree.cos(inputValue)
            })
        } else if (value === 'SIN') {
            this.setState({
                inputValue: MathInDegree.sin(inputValue)
            })
        } else if (value === 'TAN') {
            this.setState({
                inputValue: MathInDegree.tan(inputValue)
            })
        } else if (value === 'ACOS') {
            this.setState({
                inputValue: MathInDegree.acos(inputValue)
            })
        } else if (value === 'ASIN') {
            this.setState({
                inputValue: MathInDegree.asin(inputValue)
            })
        } else if (value === 'ATAN') {
            this.setState({
                inputValue: MathInDegree.atan(inputValue)
            })
        } else if (value === 'EXIT') {
            this.setState({inputValue: ''})
        } else if (value === 'DEL') {
            let updatedValue
            if (inputValue) {
                updatedValue = inputValue.length > 2
                    ? inputValue
                        .toString()
                        .slice(0, -1)
                    : '0';
                this.setState({inputValue: updatedValue})
            }

        }
    }

    changeToHypHandler = () => {
        this.setState({trigsAreInverse: !this.state.trigsAreInverse})
    }

    render() {
        const {calculatorKeysArray, calculatorKeysArrayInverse, trigsAreInverse} = this.state;
        let calculatorKeys = trigsAreInverse
            ? calculatorKeysArrayInverse
            : calculatorKeysArray

        calculatorKeys = calculatorKeys.map((calcKey) => (
            <span key={calcKey.id}><input
                onClick={this.inputValueHandler}
                className={`button ${calcKey.buttonColor}`}
                type="button"
                name={calcKey.inputOperator}
                value={calcKey.inputValue}/></span>
        ));

        return (
            <div className='container'>
                <div className='calculatorScreen'>
                    <div className='display'>{this.state.inputValue}</div>
                </div>
                <div className='extraKeys'>
                    <button onClick={this.changeToHypHandler}>2nd</button>
                    <button>DEG</button>
                </div>

                <div id='buttons'>{calculatorKeys}</div>
            </div>

        );
    }
}

export default CalculatorContainer;
