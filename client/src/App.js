import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// localStorage.removeItem('siteData')

const expenses = [{ id: 1, expenseName: "", amount: 0, description: "" }];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      expenseName: "",
      amount: "",
      description: ""
    };

    this.handleInputs = this.handleInputs.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearLocalStorage = this.clearLocalStorage.bind(this);
  }

  handleInputs(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit() {
    const siteData = {
      id: this.state.id,
      expenseName: this.state.expenseName,
      amount: this.state.amount,
      description: this.state.description
    };

    // push new expense into expenses array
    expenses.push(siteData);
    console.log(expenses);

    // storing array as a string
    localStorage.setItem("siteData", JSON.stringify(expenses));

    // clear State
    this.setState({
      id: Date.now(),
      expenseName: "",
      amount: "",
      description: ""
    });
  }

  clearLocalStorage() {
    localStorage.removeItem("siteData");
  }

  render() {
    // retriving our data and converting it back into an array
    const localData = JSON.parse(localStorage.getItem("siteData"));

    console.log(localData);

    const allExpenses = localData.map(function(item) {
      return (
        <tr>
          <th scope="row">{item.id}</th>
          <td>{item.expenseName}</td>
          <td>{item.description}</td>
          <td>{item.amount}</td>
        </tr>
      );
    });

    return (
      <div>
        <form>
          <h3>Expense project</h3>
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
        <div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>{localData ? allExpenses : "no items yet"}</tbody>
          </table>
          here are expenses:
          <button onClick={this.clearLocalStorage}> Clear Local Storage</button>
        </div>
      </div>
    );
  }
}

export default App;
