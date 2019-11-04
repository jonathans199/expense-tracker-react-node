import React from 'react';
import './App.css';


class App extends React.Component {
state ={
  data: null
}
   
  componentDidMount(){
    this.callsBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }


  callsBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200){
      throw Error(body.message)
    }
    return body;
  }

  render(){
    return(
      <section>
        <p> 
          {this.state.data}
        </p>

      </section>
    )
  }

}






// function App() {



//   return (
//     <div className="App">
//       <header>
//           This is React
//       </header>


//     </div>
//   );
// }

export default App;
