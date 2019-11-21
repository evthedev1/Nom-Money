import React, { Component } from "react";
import extractIngredients from "../apiHelpers/extractIngredients.js";
import Ingredient from "./Components/Ingredient.jsx";
import getIngredientPrice from "../apiHelpers/getIngredientPrice.js";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ItemToBuy from "./Components/ItemToBuy.jsx";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      recipe: "",
      recipeTotal: 0,
      itemsToBuy: [],
      checkedIngredients: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateTotal = this.updateTotal.bind(this);
    this.addToShoppingList = this.addToShoppingList.bind(this);
    this.toggleCheck = this.toggleCheck.bind(this);
  }

  handleChange(event) {
    this.setState({ recipe: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ ingredients: [], recipeTotal: 0 });
    extractIngredients(this.state.recipe).then(data => {
      let checkedObj = {};
      data.forEach(ingredient => {
        getIngredientPrice(ingredient.original).then(data => {
          this.setState({ ingredients: this.state.ingredients.concat(data) });
          // this.setState({
          //   checkedIngredients: this.state.checkedIngredients.concat(data)
          // });
          console.log("ingredient name", data.name);
          checkedObj[data.name] = true;
          this.setState({
            recipeTotal:
              this.state.recipeTotal +
              Number((data.estimatedCost.value / 100).toFixed(2))
          });
        });
      });
      this.setState({ checkedIngredients: checkedObj });
    });
  }

  updateTotal(number) {
    this.setState({ recipeTotal: this.state.recipeTotal + Number(number) });
  }
  toggleCheck(name) {
    newCheckObj = {};
    console.log("name", name);

    for (let key in this.state.checkedIngredients) {
      if (key === name) {
        newCheckObj[key] = !this.state.checkedIngredients[key];
      } else {
        newCheckObj[key] = this.state.checkedIngredients[key];
      }
    }
  }
  addToShoppingList() {
    // let toBuy = this.state.ingredients.map(ingredient => {
    //   return ingredient.name;
    // });
    let toBuy = [];
    for (let key in this.state.checkedIngredients) {
      if (this.state.checkedIngredients[key]) {
        toBuy.push(key);
      }
    }
    this.setState({ itemsToBuy: this.state.itemsToBuy.concat(toBuy) });
  }
  render() {
    return (
      <div>
        <div className="logo">NOM-MONEY</div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <div className="link-submit">
              <TextField
                id="recipe-link"
                label="Recipe Link Here"
                margin="normal"
                type="text"
                value={this.state.recipe}
                onChange={this.handleChange}
              />
              <Button
                className="button-submit"
                onClick={this.handleSubmit}
                variant="outlined"
              >
                Submit
              </Button>
              <Button
                className="button-add-shopping"
                onClick={this.addToShoppingList}
                variant="outlined"
              >
                Add to Shopping List
              </Button>
            </div>
          </label>
        </form>
        {this.state.ingredients.map(ingredient => {
          return (
            <Ingredient
              updateTotal={this.updateTotal}
              ingredient={ingredient}
              name={ingredient.name}
              toggleCheck={this.toggleCheck}
            />
          );
        })}
        <div className="ingredient-name">
          Total &nbsp;&nbsp; ${this.state.recipeTotal.toFixed(2)} per serving
        </div>
        <br></br>
        <h3>MY SHOPPING LIST</h3>
        {this.state.itemsToBuy.map(item => {
          return <ItemToBuy item={item} />;
        })}
        <br></br>
        <br></br>
        <a href="http://ec2-34-216-243-255.us-west-2.compute.amazonaws.com/">
          too broke? check out NOM-PANTRY
        </a>
        <br></br>
        <a href="www.google.com">want to get fit? check out NOM-FIT</a>
      </div>
    );
  }
}
