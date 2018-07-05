import React, {Component} from 'react';
import './calculatorContainer.css';
import {MathInDegree} from '../../utility/utility';
import {calculatorKeysArray} from '../../calculatorInputButtons/calculatorInputButtons';

class CalculatorContainer extends Component {
    state = {
        calculatorKeysArray,
        inputValue: '',
        result: ''
    }

    isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n)

    inputValueHandler = (event) => {
        let {inputValue} = this.state;
        const OPERATORSREG = /[+-/*^.]$/;
        const OPERATORS = "+-/*^.()";
        const {value, name} =  event.target
        if ((this.isNumber(value) || OPERATORS.includes(name)) && !OPERATORSREG.test(inputValue)){
            this.setState({
                inputValue: inputValue + name
            })
            // if (OPERATORSREG.test(inputValue)) {
            //     this.setState({inputValue: inputValue})
            // }
        } else if (event.target.value === '=') {
            // eslint-disable-next-line
            this.setState({inputValue: eval(inputValue)})
        } else if (event.target.value === 'PI') {
            this.setState({
                inputValue: inputValue + (Math.PI).toFixed(2)
            })
            if (inputValue.endsWith((Math.PI).toFixed(2))) {
                this.setState({
                    inputValue: (Math.PI).toFixed(2)
                })
            }
        } else if (event.target.value === 'CLR') {
            this.setState({inputValue: ''})
        } else if (event.target.value === 'COS') {
            this.setState({
                inputValue: MathInDegree.cos(inputValue)
            })
        } else if (event.target.value === 'SIN') {
            this.setState({
                inputValue: MathInDegree.sin(inputValue)
            })
        } else if (event.target.value === 'TAN') {
            this.setState({
                inputValue: MathInDegree.tan(inputValue)
            })
        }
        else if (event.target.value === 'DEL') {
            let updatedValue = inputValue ? inputValue.slice(0, -1) : '0';
            console.log(updatedValue)
            this.setState({
                inputValue: updatedValue
            })
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
