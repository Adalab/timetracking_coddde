import React from 'react';
import Databasetest from './components/Databasetest';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <Databasetest />
        </p>
      </div>
    );
  }
}

export default App;
