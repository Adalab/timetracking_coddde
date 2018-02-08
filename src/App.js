import React, { Component } from 'react';
import './App.css';
import Loading from './components/Loading';
import Timer from './components/Timer';

class App extends Component {
  render() {
    return (
      <div className="App">
      	<Loading />
				<Timer />
      </div>
    );
  }
}

export default App;
