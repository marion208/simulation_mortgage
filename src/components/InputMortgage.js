import React, { Component } from 'react';

class InputMortgage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueMortgage: 0
        };

        this.handleInputAmoutMortgage = this.handleInputAmoutMortgage.bind(this);
        this.handleUpdateAmoutMortgage = this.handleUpdateAmoutMortgage.bind(this);
    }

    handleInputAmoutMortgage(e) {
        var inputValueAmountMortgageComponent = document.getElementById("input_amount_component");
        var newValue = parseInt(inputValueAmountMortgageComponent.value, 10);
        if (newValue > 600000) {
            newValue = 600000;
        } else if (newValue < 0) {
            newValue = 0;
        } else if (isNaN(newValue)) {
            newValue = 0;
        }
        this.setState({ valueMortgage: newValue }, () => {
            this.props.onChange(e);
        });
    }

    handleUpdateAmoutMortgage(e) {
        var inputAmountMortgageComponent = document.getElementById("slide_amount_component");
        this.setState({ valueMortgage: inputAmountMortgageComponent.value }, () => {
            this.props.onChange(e);
        });
    }

    render() {
        return (
            <div className="card_range">
                <p className="title_input_range">Montant de votre prêt</p>
                <div>
                    <span className="value_input_range"><input type="tel" min="0" max="600000" id="input_amount_component" onChange={this.handleInputAmoutMortgage} value={this.state.valueMortgage} /> €</span>
                </div>
                <input type="range" min="0" max="600000" step="1000" id="slide_amount_component" onChange={this.handleUpdateAmoutMortgage} value={this.state.valueMortgage} />
            </div>
        )
    }
}

export default InputMortgage;
