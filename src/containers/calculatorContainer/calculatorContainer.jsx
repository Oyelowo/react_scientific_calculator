import React, {Component} from 'react';
import './calculatorContainer.css';
import {MathInDegree, isNumber, factorial} from '../../utility/utility';
import {calculatorKeysArray, calculatorKeysArrayInverse} from '../../calculatorInputButtons/calculatorInputButtons';

class CalculatorContainer extends Component {
    state = {
        calculatorKeysArray,
        calculatorKeysArrayInverse,
        displayedCharacters: '',
        prevChar: '',
        btnChar: '',
        trigsAreInverse: false,
        trigIsDegree: true,
        evaluated: false
    }

    componentDidMount() {
        document.addEventListener('keypress', this.displayedCharactersHandler);
            // document.addEventListener('keydown', this.displayedCharactersHandler);
    }

    componentWillUnmount() {
        // document.removeEventListener('keydown', this.displayedCharactersHandler);
        document.removeEventListener('keypress', this.displayedCharactersHandler);
    }

    getBtnChar = (event) => {
        event = event || window.event;
        let charCode = event.keyCode || event.which;
        let charStr = String.fromCharCode(charCode);
        this.setState({btnChar: charStr})
        return charStr;
    }

    displayedCharactersHandler = (event) => {
        try {
            let {displayedCharacters, trigIsDegree} = this.state;

            const operatorsRegex = /[+-/*.%]/;
            let {value: eventTargetValue, id: eventTargetId} = event.target;

            // change X to * for evaluating multiplication and 'MOD' for modulus
            eventTargetValue = eventTargetValue == 'X'
                ? '*'
                : eventTargetValue == 'MOD'
                    ? '%'
                    : eventTargetValue;

            if (event.keyCode) {
                eventTargetValue = this.getBtnChar();
            }

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

            } else {
                switch (eventTargetValue) {
                    case 'AC':
                        this.setState({displayedCharacters: '0'});
                        break;

                    case 'COS':
                        let cosResult = trigIsDegree
                            ? MathInDegree.cos(displayedCharacters)
                            : Math.cos(displayedCharacters);
                        this.setState({displayedCharacters: cosResult});
                        break;

                    case 'SIN':
                        let sinResult = trigIsDegree
                            ? MathInDegree.sin(displayedCharacters)
                            : Math.sin(displayedCharacters);
                        this.setState({displayedCharacters: sinResult});
                        break;

                    case 'TAN':
                        let tanResult = trigIsDegree
                            ? MathInDegree.tan(displayedCharacters)
                            : Math.tan(displayedCharacters);
                        this.setState({displayedCharacters: tanResult});
                        break;

                    case 'ACOS':
                        let acosResult = trigIsDegree
                            ? MathInDegree.acos(displayedCharacters)
                            : Math.acos(displayedCharacters);
                        this.setState({displayedCharacters: acosResult});
                        break;

                    case 'ASIN':
                        let asinResult = trigIsDegree
                            ? MathInDegree.asin(displayedCharacters)
                            : Math.asin(displayedCharacters);
                        this.setState({displayedCharacters: asinResult});
                        break;

                    case 'ATAN':
                        let atanResult = trigIsDegree
                            ? MathInDegree.atan(displayedCharacters)
                            : Math.atan(displayedCharacters);
                        this.setState({displayedCharacters: atanResult});
                        break;

                    case 'EXIT':
                        this.setState({displayedCharacters: ''});
                        break;

                    case 'DEL':
                    case 'D': case 'd':
                        let updatedValue;
                        if (displayedCharacters) {
                            updatedValue = displayedCharacters.length > 2
                                ? displayedCharacters
                                    .toString()
                                    .slice(0, -1)
                                : '0';
                        }
                        this.setState({displayedCharacters: updatedValue});
                        event.preventDefault();
                        break;

                    case '(':
                    case ')':
                        this.setState({
                            displayedCharacters: displayedCharacters + eventTargetValue
                        });
                        break;

                    case '=':
                    case String.fromCharCode(13):
                        // eslint-disable-next-line
                        this.setState({displayedCharacters: eval(displayedCharacters), evaluated: true});
                        break;
                    case 'π':
                        let pi = Math
                            .PI
                            .toFixed(2);
                        if (/\D$/.test(displayedCharacters)) {
                            this.setState({
                                displayedCharacters: displayedCharacters + pi.toString()
                            });
                        } else {
                            this.setState({
                                displayedCharacters: pi.toString()
                            });
                        };
                        break;
                    case '±':
                        this.setState({
                            displayedCharacters: -displayedCharacters
                        });
                        break;
                    case 'ABS':
                        this.setState({
                            displayedCharacters: Math.abs(displayedCharacters)
                        });
                        break;

                    case '√':
                        this.setState({
                            displayedCharacters: Math.sqrt(displayedCharacters)
                        });
                        break;

                    case 'SQR':
                        this.setState({
                            displayedCharacters: Math.pow(displayedCharacters, 2)
                        });
                        break;

                    case '^':
                        this.setState({
                            displayedCharacters: displayedCharacters + '**'
                        });
                        break;

                    case 'LOG':
                        this.setState({
                            displayedCharacters: Math.log10(displayedCharacters)
                        });
                        break;

                    case 'In':
                        let E = Math
                            .E
                            .toFixed(2)
                            .toString();
                        if (/\D$/.test(displayedCharacters)) {
                            this.setState({
                                displayedCharacters: displayedCharacters + E
                            })
                        } else if (displayedCharacters == '0') {
                            this.setState({displayedCharacters: E})
                        }
                        break;

                    case 'n!':
                        this.setState({displayedCharacters: factorial(displayedCharacters)});
                        break;

                    case 'EXP':
                        this.setState({
                            displayedCharacters: Math.exp(displayedCharacters)
                        });
                        break;
                    default:
                        this.state.displayedCharacters;

                }
            }
        } catch (error) {
            this.setState({displayedCharacters: error})
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
                id={calcKey.id}
                value={calcKey.btnCharacter}/></span>
        ));

        return (
            <div className='container'>

                <div className='calculatorScreen'>
                    <div className='display'>{this
                            .state
                            .displayedCharacters
                            .toString()
                            .replace(/\*/g, '×')
                            .replace(/-/g, '−')
                            .replace(/××/g, '^')}</div>
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
