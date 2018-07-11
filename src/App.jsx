import React, {Component} from 'react';
import './App.css';
import CalculatorContainer from './containers/calculatorContainer/calculatorContainer';

class App extends Component {
  render() {
    return (
      <div>
        <h1>My ReactJS Scientific Calculator
          <i className="fas fa-calculator"></i>
        </h1>
        <CalculatorContainer/>
        <p>You can also use your keyboard. Delete with key 'D', Evaluate with Enter Key.</p>
        <footer>Coded by:
          <a
            href="https://www.linkedin.com/in/oyelowo-oyedayo/"
            target="_blank"
            rel="noopener noreferrer">&nbsp; 
            <i className="fab fa-linkedin"></i>
              Oyelowo Oyedayo</a>
        </footer>
      </div>
    );
  }
}

export default App;
