import React, { Component } from 'react';

class InputDuration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            durationMortgage: 2
        };

        this.handleInputDuration = this.handleInputDuration.bind(this);
        this.handleUpdateDuration = this.handleUpdateDuration.bind(this);
    }

    handleInputDuration(e) {
        var inputValueDurationComponent = document.getElementById("input_duration_component");
        var newValue = parseInt(inputValueDurationComponent.value, 10);
        if (newValue > 30) {
            newValue = 30;
        } else if (newValue < 2) {
            newValue = 2;
        } else if (isNaN(newValue)) {
            newValue = 2;
        }
        this.setState({ durationMortgage: newValue }, () => {
            this.props.onChange(e);
        });
    }

    handleUpdateDuration(e) {
        var inputDurationComponent = document.getElementById("slide_duration_component");
        this.setState({ durationMortgage: inputDurationComponent.value }, () => {
            this.props.onChange(e);
        });
    }

    render() {
        return (
            <div className="card_range">
                <p className="title_input_range">Durée de votre prêt</p>
                <div>
                    <span className="value_input_range"><input type="tel" min="0" max="30" id="input_duration_component" onChange={this.handleInputDuration} value={this.state.durationMortgage} /> ans</span>
                </div>
                <input type="range" min="2" max="30" step="1" id="slide_duration_component" onChange={this.handleUpdateDuration} value={this.state.durationMortgage} />
            </div>
        )
    }
}

export default InputDuration;
