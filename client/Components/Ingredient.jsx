import React, { Component } from "react";

export default class Ingredient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: true,
      price: (this.props.ingredient.estimatedCost.value / 100).toFixed(2)
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange() {
    console.log("current state", this.state.isChecked);
    this.state.isChecked
      ? this.props.updateTotal(-this.state.price)
      : this.props.updateTotal(this.state.price);
    this.setState({ isChecked: !this.state.isChecked });
  }
  render() {
    return (
      <div>
        <input
          name="ingredient-check"
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.handleInputChange}
        />
        <div className="ingredient-name">${this.state.price} &nbsp;&nbsp;</div>
        {this.props.ingredient.original}
      </div>
    );
  }
}
