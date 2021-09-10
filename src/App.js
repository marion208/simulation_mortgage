import React, { Component } from 'react';
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import InputMortgage from './components/InputMortgage';
import InputDuration from './components/InputDuration';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    var rateInterest = document.getElementById("rate_interest");
    var rateInsurance = document.getElementById("rate_insurance");
    rateInterest.value = 0.79;
    rateInsurance.value = 0.34;
    this.handleInputChange();
  }

  handleInputChange() {
    var inputAmount = document.getElementById("input_amount_component");
    var inputDuration = document.getElementById("input_duration_component");
    var rateInterest = document.getElementById("rate_interest");
    var rateInsurance = document.getElementById("rate_insurance");
    var calculMensualiteWithoutInsurance = ((inputAmount.value * rateInterest.value / 100) / 12) / (1 - Math.pow(1 + (rateInterest.value / 100 / 12), - 12 * inputDuration.value));
    var calculMensualiteInsurance = inputAmount.value * (rateInsurance.value / 100) * inputDuration.value / (inputDuration.value * 12);
    var calculMensualiteAllInclusive = calculMensualiteWithoutInsurance + calculMensualiteInsurance;
    var resultCalculInsurance = parseInt(inputAmount.value) * parseInt(inputDuration.value) * parseFloat(rateInsurance.value) / 100;
    var resultCalculCost = calculMensualiteWithoutInsurance * parseInt(inputDuration.value) * 12 - parseInt(inputAmount.value) + resultCalculInsurance;
    var resultMortgage = document.getElementById("result_mortgage");
    var resultCost = document.getElementById("result_cost");
    var resultInsurance = document.getElementById("result_insurance");
    resultMortgage.innerHTML = isNaN(calculMensualiteAllInclusive) ? '-' : parseInt(calculMensualiteAllInclusive);
    resultCost.innerHTML = isNaN(resultCalculCost) ? '-' : parseInt(resultCalculCost);
    resultInsurance.innerHTML = isNaN(calculMensualiteAllInclusive) ? '-' : isNaN(resultCalculInsurance) ? '-' : parseInt(resultCalculInsurance);
  }

  handleInputChangeDuration() {
    var inputAmount = document.getElementById("input_amount_component");
    var inputDuration = document.getElementById("input_duration_component");
    var rateInterest = document.getElementById("rate_interest");
    var rateInsurance = document.getElementById("rate_insurance");
    var durationValue = inputDuration.value;
    var newRateInterest = 0.43;
    switch (durationValue) {
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        newRateInterest = 4.44;
        break;
      case '10':
      case '11':
        newRateInterest = 0.63;
        break;
      case '12':
      case '13':
      case '14':
        newRateInterest = 0.7;
        break;
      case '15':
      case '16':
      case '17':
      case '18':
      case '19':
        newRateInterest = 0.79;
        break;
      case '20':
      case '21':
      case '22':
      case '23':
      case '24':
        newRateInterest = 0.97;
        break;
      case '25':
      case '26':
      case '27':
      case '28':
      case '29':
        newRateInterest = 1.19;
        break;
      case '30':
        newRateInterest = 2.15;
        break;
      default:
        newRateInterest = 0.44;
    }
    var calculMensualiteWithoutInsurance = ((inputAmount.value * newRateInterest / 100) / 12) / (1 - Math.pow(1 + (newRateInterest / 100 / 12), - 12 * inputDuration.value));
    var calculMensualiteInsurance = inputAmount.value * (rateInsurance.value / 100) * inputDuration.value / (inputDuration.value * 12);
    var calculMensualiteAllInclusive = calculMensualiteWithoutInsurance + calculMensualiteInsurance;
    var resultCalculInsurance = parseInt(inputAmount.value) * parseInt(inputDuration.value) * parseFloat(rateInsurance.value) / 100;
    var resultCalculCost = calculMensualiteWithoutInsurance * parseInt(inputDuration.value) * 12 - parseInt(inputAmount.value) + resultCalculInsurance;
    var resultMortgage = document.getElementById("result_mortgage");
    var resultCost = document.getElementById("result_cost");
    var resultInsurance = document.getElementById("result_insurance");
    rateInterest.value = newRateInterest;
    resultMortgage.innerHTML = isNaN(calculMensualiteAllInclusive) ? '-' : parseInt(calculMensualiteAllInclusive);
    resultCost.innerHTML = isNaN(resultCalculCost) ? '-' : parseInt(resultCalculCost);
    resultInsurance.innerHTML = isNaN(calculMensualiteAllInclusive) ? '-' : isNaN(resultCalculInsurance) ? '-' : parseInt(resultCalculInsurance);
  }

  render() {
    return (
      <div className="App">
        <h1>Calcul des mensualités pour un prêt immobilier</h1>
        <div className="card_container">
          <div className="card">
            <InputMortgage onChange={this.handleInputChange} />
            <InputDuration onChange={this.handleInputChangeDuration} />
            <p className="low_weight">Taux d'intérêt <FontAwesomeIcon icon={faQuestionCircle} className="tip_help" title="Par défaut, nous utilisons le taux moyen constaté pour un crédit de cette durée" /> <span className="input_rate"><input type="number" id="rate_interest" onChange={this.handleInputChange} /> %</span></p>
            <p className="low_weight">Taux d'assurance <span className="input_rate"><input type="number" id="rate_insurance" onChange={this.handleInputChange} /> %</span></p>
          </div>
          <div className="card">
            <p>Votre mensualité sera de</p>
            <p><span className="high_weight" id="result_mortgage"></span> €/mois</p>
            <p className="low_weight low_font_size">Coût du crédit : <span className="normal_weight" id="result_cost"></span>€ dont <span className="normal_weight" id="result_insurance"></span>€ d'assurance</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
