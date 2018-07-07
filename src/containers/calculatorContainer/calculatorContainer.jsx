import React, {Component} from 'react';
import './calculatorContainer.css';
import {MathInDegree} from '../../utility/utility';
import {calculatorKeysArray} from '../../calculatorInputButtons/calculatorInputButtons';

class CalculatorContainer extends Component {
    state = {
        calculatorKeysArray,
        inputValue: '0',
        filteredValue: '',
        result: ''
    }

    isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n)

    inputValueHandler = (event) => {
        let {inputValue} = this.state;
        
        // inputValue= inputValue.replace(/^0+(?!\.|$)/, '')
        const OPERATORSREG = /[+-/*^.]/;
        // let shownInputs = "+-/*^.";
        const {value, name} = event.target
        if (this.isNumber(value) || OPERATORSREG.test(name) ) {
            inputValue= inputValue=='0' && name!= '.'? '': inputValue;
           let myName = name == '.' && inputValue.includes('.') ? '': name;
            let check = inputValue + myName;
            this.setState({inputValue: check})

            if (!this.isNumber(value) && OPERATORSREG.test(inputValue.toString().slice(-1))) {
                check = inputValue.slice(0, -1) + name
                this.setState({inputValue: check})
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
        } else if (value === 'CLR') {
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
        } else if (value === 'DEL') {
            let updatedValue = inputValue.length > 2
                ? inputValue
                    .toString()
                    .slice(0, -1)
                : '0';
            this.setState({inputValue: updatedValue})
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
