import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);

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
    const localData = JSON.parse(localStorage.getItem("siteData")) || [];

    // pass localData into ITEM within STATE
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
    const siteData = {
      id: this.state.currentExpenseItem.id,
      expenseName: this.state.currentExpenseItem.expenseName,
      amount: this.state.currentExpenseItem.amount,
      description: this.state.currentExpenseItem.description
    };

    this.setState(
      {
        items: [...this.state.items, siteData]
      },
      () => {
        localStorage.setItem("siteData", JSON.stringify(this.state.items));
      }
    );

    // clear input fields
    
    
  }

  clearLocalStorage() {
    localStorage.removeItem("siteData");
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
          here are expenses:
          <button onClick={this.clearLocalStorage}> Clear Local Storage</button>
        </div>
      </div>
    );
  }
}

export default App;
