import React from "react";
import "./App.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
        expenseDate: new Date()
      }                
    };

    this.handleInputs = this.handleInputs.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearLocalStorage = this.clearLocalStorage.bind(this);
    // this.handleDateChange = this.handleDateChange.bind(this)
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
    
    console.log(currentState)

    this.setState(currentState);

  }

  handleDateChange(date){
    this.setState({
      currentExpenseItem: {
        expenseDate: date
      }
      
    })
  }

  handleSubmit() {
    const singleItem = {
      id: Date.now(),
      expenseName: this.state.currentExpenseItem.expenseName,
      amount: this.state.currentExpenseItem.amount,
      description: this.state.currentExpenseItem.description,
      expenseDate: this.state.currentExpenseItem.expenseDate
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
    })
  }

  render() {
    const allExpenses = this.state.items.map(function(item) {
      return (
        <tr key={item.id}>
          <td>{item.expenseName}</td>
          <td>{item.description}</td>
          <td>{item.amount}</td>
          <td>{item.expenseDate.date}</td> 
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
          <DatePicker
            name="expenseDate"
            selected={this.state.currentExpenseItem.expenseDate}
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
