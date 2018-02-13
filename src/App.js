import React from 'react';
import Databasetest from './components/Databasetest';
import Loading from './components/Loading';
import Graphic from './components/Graphic';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Databasetest />
      	<Loading />
				<input className="calendar" type="date" value="today"></input>
				<Graphic />
      </div>
    );
  }
}

export default App;
