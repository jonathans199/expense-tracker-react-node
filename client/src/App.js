import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      items: [],
      currentExpenseItem: {
        id: "",
        expenseName: "",
        amount: "",
        description: ""
      }
    };

    this.handleInputs = this.handleInputs.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearLocalStorage = this.clearLocalStorage.bind(this);
  }

  componentDidMount() {
    // if SITEDATA available create constant localData
    const localData = JSON.parse(localStorage.getItem("singleItem")) || [];

    // pass localData into ITEMS within STATE
    this.setState({
      items: localData
    });
  }

  handleInputs(e) {
    const currentState = { ...this.state };

    currentState.currentExpenseItem[e.target.name] = e.target.value;

    this.setState(currentState);
  }

  handleSubmit() {
    e.preventDefault();
    const singleItem = {
      id: Date.now(),
      expenseName: this.state.currentExpenseItem.expenseName,
      amount: this.state.currentExpenseItem.amount,
      description: this.state.currentExpenseItem.description
    };

    // on every button click add singleItem
    this.setState(
      {
        items: [...this.state.items, singleItem]
      },
      () => {
        localStorage.setItem("localData", JSON.stringify(this.state.items));
      }
    );

    // clear input fields
  }

  clearLocalStorage() {
    localStorage.removeItem("localData");

    this.setState({
      items: []
    });
  }

  render() {
    const allExpenses = this.state.items.map(function(item) {
      return (
        <tr key={item.id}>
          <td>{item.expenseName}</td>
          <td>{item.description}</td>
          <td>{item.amount}</td>
        </tr>
      );
    });

    return (
      <div>
        <form className="form-input" onSubmit={this.handleSubmit} noValidate>
          <h3>Expense project</h3>
          <input
            name="expenseName"
            placeholder="Expense Name"
            onChange={this.handleInputs}
            type="text"
            required
          />
          <input
            name="amount"
            placeholder="Amount"
            onChange={this.handleInputs}
            required
          />
          <input
            name="description"
            placeholder="Description"
            onChange={this.handleInputs}
            type="text"
            required
          />
          <button type="button">submit</button>
        </form>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>{allExpenses}</tbody>
          </table>
          <button onClick={this.clearLocalStorage}> Clear</button>
        </div>
      </div>
    );
  }
}

export default App;
