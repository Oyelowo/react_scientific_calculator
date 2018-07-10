import React, {Component} from 'react';
import './calculatorContainer.css';
import {MathInDegree, isNumber} from '../../utility/utility';
import {calculatorKeysArray, calculatorKeysArrayInverse} from '../../calculatorInputButtons/calculatorInputButtons';

class CalculatorContainer extends Component {
    state = {
        calculatorKeysArray,
        calculatorKeysArrayInverse,
        displayedCharacters: '',
        btnChar: '',
        trigsAreInverse: false,
        trigIsDegree: true
    }

    componentDidMount() {
        document.addEventListener('keypress', this.displayedCharactersHandler)
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.displayedCharactersHandler);
    }

    getBtnChar = (event) => {
        event = event || window.event;
        let charCode = event.keyCode || event.which;
        let charStr = String.fromCharCode(charCode);
        return charStr;
    }   

    displayedCharactersHandler = (event) => {
        let {displayedCharacters, trigIsDegree} = this.state;
        const operatorsRegex = /[+-/*^.]/;
        let {value: eventTargetValue} = event.target;

        // change X to * for evaluating multiplication
        eventTargetValue = eventTargetValue == 'X'
            ? '*'
            : eventTargetValue;

        if (event.keyCode) {
            eventTargetValue = this.getBtnChar()
        }
        // this.setState({btnChar: eventTargetValue})

        if (isNumber(eventTargetValue) || operatorsRegex.test(eventTargetValue)) {
            // prevent multiple zeros at the beginning
            displayedCharacters = displayedCharacters === '0' && eventTargetValue !== '.'
                ? ''
                : displayedCharacters;

            // prevent adding multiple decimals at a time
            let newValue = eventTargetValue === '.' && displayedCharacters.includes('.')
                ? ''
                : eventTargetValue;
            let updatedDisplayedCharacters = displayedCharacters + newValue;
            this.setState({displayedCharacters: updatedDisplayedCharacters})

            if (!isNumber(eventTargetValue) && operatorsRegex.test(displayedCharacters.toString().slice(-1))) {

                updatedDisplayedCharacters = displayedCharacters.slice(0, -1) + eventTargetValue;

                this.setState({displayedCharacters: updatedDisplayedCharacters})
            }

        } else if (eventTargetValue === '(' || eventTargetValue === ')') {
            this.setState({
                displayedCharacters: displayedCharacters + eventTargetValue
            })
        } else if (eventTargetValue === '=') {
            // eslint-disable-next-line
            this.setState({displayedCharacters: eval(displayedCharacters)})
        } else if (eventTargetValue === 'PI') {
            this.setState({
                displayedCharacters: displayedCharacters + (Math.PI).toFixed(2)
            })

            if (displayedCharacters.endsWith((Math.PI).toFixed(2))) {
                this.setState({
                    displayedCharacters: (Math.PI).toFixed(2)
                })
            }
        } else if (eventTargetValue === 'AC') {
            this.setState({displayedCharacters: '0'})
        } else if (eventTargetValue === 'COS') {
            let updatedDisplayedCharacters = trigIsDegree
                ? MathInDegree.cos(displayedCharacters)
                : Math.cos(displayedCharacters)
            this.setState({displayedCharacters: updatedDisplayedCharacters})

        } else if (eventTargetValue === 'SIN') {
            let updatedDisplayedCharacters = trigIsDegree
                ? MathInDegree.sin(displayedCharacters)
                : Math.sin(displayedCharacters)
            this.setState({displayedCharacters: updatedDisplayedCharacters})

        } else if (eventTargetValue === 'TAN') {
            let updatedDisplayedCharacters = trigIsDegree
                ? MathInDegree.tan(displayedCharacters)
                : Math.tan(displayedCharacters)
            this.setState({displayedCharacters: updatedDisplayedCharacters})

        } else if (eventTargetValue === 'ACOS') {
            let updatedDisplayedCharacters = trigIsDegree
                ? MathInDegree.acos(displayedCharacters)
                : Math.acos(displayedCharacters)
            this.setState({displayedCharacters: updatedDisplayedCharacters})
        } else if (eventTargetValue === 'ASIN') {
            let updatedDisplayedCharacters = trigIsDegree
                ? MathInDegree.asin(displayedCharacters)
                : Math.asin(displayedCharacters)
            this.setState({displayedCharacters: updatedDisplayedCharacters})
        } else if (eventTargetValue === 'ATAN') {
            let updatedDisplayedCharacters = trigIsDegree
                ? MathInDegree.atan(displayedCharacters)
                : Math.atan(displayedCharacters)
            this.setState({displayedCharacters: updatedDisplayedCharacters})
        } else if (eventTargetValue === 'EXIT') {
            this.setState({displayedCharacters: ''})
        } else if (eventTargetValue === 'DEL') {
            let updatedValue
            if (displayedCharacters) {
                updatedValue = displayedCharacters.length > 2
                    ? displayedCharacters
                        .toString()
                        .slice(0, -1)
                    : '0';
                this.setState({displayedCharacters: updatedValue})
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
                onClick={this.displayedCharactersHandler}
                className={`button ${calcKey.buttonColor}`}
                type="button"
                value={calcKey.btnCharacter}/></span>
        ));

        return (
            <div className='container'>

                <div className='calculatorScreen'>
                    <div className='display'>{this
                            .state
                            .displayedCharacters
                            .toString()
                            .replace(/\*/g, 'X')}</div>
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
