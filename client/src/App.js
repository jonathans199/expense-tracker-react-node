import React from "react";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      expenseName: "",
      amount: "",
      description: ""
    };

    this.handleInputs = this.handleInputs.bind(this);
  }

  handleInputs(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <section>
        <h3> Expense project</h3>
        <input
          name="expenseName"
          placeholder="Expense Name"
          onChange={this.handleInputs}
        />
        <h3>{this.state.expenseName}</h3>
        <input
          name="amount"
          placeholder="Amount"
          onChange={this.handleInputs}
        />
        <h3>{this.state.amount}</h3>
        <input
          name="description"
          placeholder="Description"
          onChange={this.handleInputs}
        />
        <h3>{this.state.description}</h3> 
        <button type="button">submit</button>
      </section>
    );
  }
}



export default App;
