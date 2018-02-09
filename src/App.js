import React, { Component } from 'react';
// import Loading from './components/Loading';
import Timer from './components/Timer';
import Counter from './components/Counter';

class App extends Component {
  render() {
    return (
      <div className="App">
      	{/* <Loading /> */}
				<Timer />
				<Counter />
				{/* <input type="date"></input> */}
      </div>
    );
  }
}

export default App;
