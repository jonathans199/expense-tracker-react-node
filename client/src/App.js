import React from "react";
import "./App.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { be } from "date-fns/locale";

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
        expenseDate: new Date()
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

    console.log(currentState);

    this.setState(currentState);
  }

  handleSubmit() {
    const today = this.state.currentExpenseItem.expenseDate

    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    const fullDate = mm + "/" + dd + "/" + yyyy;

    const singleItem = {
      id: Date.now(),
      expenseName: this.state.currentExpenseItem.expenseName,
      amount: this.state.currentExpenseItem.amount,
      description: this.state.currentExpenseItem.description,
      expenseDate: fullDate
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
    const allExpenses = this.state.items
      .map(function(item) {
        return (
          <tr key={item.id}>
            <td>{item.expenseName}</td>
            <td>{item.description}</td>
            <td>{item.amount}</td>
            <td>{item.expenseDate}</td>
          </tr>
        );
      })
      .sort(function(a, b) {
        return a.expenseName - b.expenseDate;
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
          <DatePicker
            name="expenseDate"
            selected={this.state.currentExpenseItem.expenseDate}
            onChange={this.handleInputs}
            value={this.state.currentExpenseItem.expenseDate}
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
