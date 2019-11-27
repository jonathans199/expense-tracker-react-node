import React from "react";
import "./App.css";
import propTypes from 'prop-types'
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      currentExpenseItem: {
        id: "",
        expenseName: "",
        amount: 0,
        description: "",
        date: new Date()
      }
    };

    this.handleInputs = this.handleInputs.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearLocalStorage = this.clearLocalStorage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  App.propTypes = {
    
  }

  componentDidMount() {
    // if SITEDATA available create constant localData
    const localData = JSON.parse(localStorage.getItem("localData")) || [];

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

  handleSubmit() {
    /******
     * TO DO 
     * - validate fields
     * 
     */

     if(this.state.currentExpenseItem.expenseName){
        alert('it needs to be a string')
     }


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
        items: [...this.state.items, singleItem],
        
        // clears the input fields 
        currentExpenseItem: {
          expenseName: "",
          amount: 0,
          description: "",
          date: ""
        }
      },
      () => {
        // second argument to put items from state in to localStorage
        localStorage.setItem("localData", JSON.stringify(this.state.items));
      }
    );
  }

  // clear local storage
  clearLocalStorage() {
    localStorage.removeItem("localData");

    //clearing state
    this.setState({
      items: []
    });
  }

  handleDelete() {
    console.log("delete item");
  }

  render() {
    const allExpenses = this.state.items
      .map(function(item) {
        return (
          <tr key={item.id}>
            <td>{item.expenseName}</td>
            <td>{item.description}</td>
            <td>{item.amount}</td>
            <td>{item.date}</td>
            <td>
              <button>Delete</button>
            </td>
          </tr>
        );
      })
      .sort(function(a, b) {
        return a.date - b.date;
      });

    return (
      <div className="expense-project">
        <form>
          <h3>Expenses </h3>
          <input
            name="expenseName"
            placeholder="Expense Name"
            onChange={this.handleInputs}
            value={this.state.currentExpenseItem.expenseName}
          />
          <input
            name="amount"
            placeholder="Amount"
            onChange={this.handleInputs}
            value={this.state.currentExpenseItem.amount}
          />
          <input
            name="description"
            placeholder="Description"
            onChange={this.handleInputs}
            value={this.state.currentExpenseItem.description}
          />
          <input
            name="date"
            placeholder="mm / dd / yyyy"
            onChange={this.handleInputs}
            value={this.state.currentExpenseItem.date}
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
