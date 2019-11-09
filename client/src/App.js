import React from "react";
import "./App.css";

// localStorage.removeItem('siteData')

const expenses = [];

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      expenseName: "",
      amount: "",
      description: ""
    };

    this.handleInputs = this.handleInputs.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputs(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit() {
    const siteData = {
      expenseName: this.state.expenseName,
      amount: this.state.amount,
      description: this.state.description
    };

    localStorage.setItem("siteData", JSON.stringify(siteData));
    
    expenses.push(siteData);
    console.log(expenses);

    // clear State
    this.setState({
      expenseName: "",
      amount: "",
      description: ""
    });

    // clear values
  }

  render() {
    const localData = JSON.parse(localStorage.getItem("siteData"));

    console.log(localData);
    return (
      <div>
        <form>
          <h3> Expense project</h3>
          <input
            name="expenseName"
            placeholder="Expense Name"
            onChange={this.handleInputs}
          />
          <input
            name="amount"
            placeholder="Amount"
            onChange={this.handleInputs}
          />
          <input
            name="description"
            placeholder="Description"
            onChange={this.handleInputs}
          />
          <button type="button" onClick={this.handleSubmit}>
            submit
          </button>
        </form>
        <div>{expenses.map( expense => expense.expenseName)} <br /> </div>
      </div>
    );
  }
}

export default App;
