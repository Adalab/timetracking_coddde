import React, { Component } from 'react';
import Loading from './components/Loading';
import Graphic from './components/Graphic';

class App extends Component {
  render() {
    return (
      <div className="App">
      	<Loading />
				<input className="calendar" type="date" value="today"></input>
				<Graphic />
      </div>
    );
  }
}

export default App;
