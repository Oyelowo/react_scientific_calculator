import React, {Component} from 'react';
import './App.css';
import CalculatorContainer from './containers/calculatorContainer/calculatorContainer';

class App extends Component {
  render() {
    return (
      <div>
        <h1>My ReactJS Scientific Calculator <i class="fas fa-calculator"></i></h1>
        <CalculatorContainer/>
        <footer>Coded by:
          <a
            href="https://www.linkedin.com/in/oyelowo-oyedayo/"
            target="_blank"
            rel="noopener noreferrer"> <i class="fab fa-linkedin"></i> Oyelowo Oyedayo</a>
        </footer>
      </div>
    );
  }
}

export default App;
