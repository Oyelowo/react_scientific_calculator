import React, {Component} from 'react';
import './calculatorContainer.css';
import {MathInDegree, isNumber} from '../../utility/utility';
import {calculatorKeysArray, calculatorKeysArrayInverse} from '../../calculatorInputButtons/calculatorInputButtons';

class CalculatorContainer extends Component {
    state = {
        calculatorKeysArray,
        calculatorKeysArrayInverse,
        inputValue: '',
        keyboardValue: '',
        trigsAreInverse: false,
        trigIsDegree: true
    }

    componentDidMount() {
        document.addEventListener('keypress', this.inputValueHandler)
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.inputValueHandler);
    }

    getKeyboardChar = (event) => {
        // event = event || window.event; let charCode = event.keyCode || event.which;
        // let charStr = String.fromCharCode(charCode); if (charStr == this) {
        // this.inputValueHandler() } alert(charStr);
    }

    //   keyboardButton = (event) => {     // convert char to code     let
    // codeFromChar = ('7').charCodeAt()     if (event.keyCode === codeFromChar) {
    // this.inputValueHandler();     }   }

    inputValueHandler = (event) => {
        let {inputValue, trigIsDegree} = this.state;

        event = event || window.event;
        let charCode = event.keyCode || event.which;
        let charStr = String.fromCharCode(charCode);

        // inputValue= inputValue.replace(/^0+(?!\.|$)/, '')
        const operatorsRegex = /[+-/*^.]/;
        // let shownInputs = "+-/*^.";
        const {value, name} = event.target

        if (isNumber(charStr) || operatorsRegex.test(charStr)) {
            inputValue = inputValue === '0' && charStr !== '.'
                ? ''
                : inputValue;
            let myCharStr = charStr === '.' && inputValue.includes('.')
                ? ''
                : charStr;
            let updatedInputValue = inputValue + myCharStr;
            this.setState({inputValue: updatedInputValue})
            if (!isNumber(charStr) && operatorsRegex.test(inputValue.toString().slice(-1))) {
                updatedInputValue = inputValue.slice(0, -1) + charStr;
                this.setState({inputValue: updatedInputValue})
            }
        } else 
        
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
                updatedInputValue = inputValue.slice(0, -1) + name;
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
            let updatedInputValue = trigIsDegree
                ? MathInDegree.cos(inputValue)
                : Math.cos(inputValue)
            this.setState({inputValue: updatedInputValue})

        } else if (value === 'SIN') {
            let updatedInputValue = trigIsDegree
                ? MathInDegree.sin(inputValue)
                : Math.sin(inputValue)
            this.setState({inputValue: updatedInputValue})

        } else if (value === 'TAN') {
            let updatedInputValue = trigIsDegree
                ? MathInDegree.tan(inputValue)
                : Math.tan(inputValue)
            this.setState({inputValue: updatedInputValue})

        } else if (value === 'ACOS') {
            let updatedInputValue = trigIsDegree
                ? MathInDegree.acos(inputValue)
                : Math.acos(inputValue)
            this.setState({inputValue: updatedInputValue})
        } else if (value === 'ASIN') {
            let updatedInputValue = trigIsDegree
                ? MathInDegree.asin(inputValue)
                : Math.asin(inputValue)
            this.setState({inputValue: updatedInputValue})
        } else if (value === 'ATAN') {
            let updatedInputValue = trigIsDegree
                ? MathInDegree.atan(inputValue)
                : Math.atan(inputValue)
            this.setState({inputValue: updatedInputValue})
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

    toggleHypHandler = () => {
        this.setState({
            trigsAreInverse: !this.state.trigsAreInverse
        })
    }

    toggleDegreeRadanHandler = () => {
        this.setState({
            trigIsDegree: !this.state.trigIsDegree
        })
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
                    <button onClick={this.toggleHypHandler}>2nd</button>
                    <button onClick={this.toggleDegreeRadanHandler}>{this.state.trigIsDegree
                            ? 'DEG'
                            : 'RAD'}</button>
                </div>

                <div id='buttons'>{calculatorKeys}</div>
            </div>

        );
    }
}

export default CalculatorContainer;
