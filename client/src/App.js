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
        description: "",
        date: ""
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
    const singleItem = {
      id: Date.now(),
      expenseName: this.state.currentExpenseItem.expenseName,
      amount: this.state.currentExpenseItem.amount,
      description: this.state.currentExpenseItem.description,
      date: this.state.currentExpenseItem.date
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

    // TO DO => clear input fields
  }

  clearLocalStorage() {
    localStorage.removeItem("localData");

    this.setState({
      items: []
    });
  }

  render() {

    if (JSON.parse(localStorage.getItem("localData"))) {
      const allExpenses = JSON.parse(localStorage.getItem("localData")) 
      .map(function(item) {
        return (
          <tr key={item.id}>
            <td>{item.expenseName}</td>
            <td>{item.description}</td>
            <td>{item.amount}</td>
            <td>{item.date}</td>
          </tr>
        );
      })
      .sort(function(a, b) {
        return a.date - b.date;
      });
    } 
      
      

    return (
      <div className="expense-project">
        <form>
          <h3>React project</h3>
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
          <input
            name="date"
            placeholder="mm / dd / yyyy"
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
                <th scope="col">Date</th>
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
