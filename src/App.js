
// import Loading from './components/Loading';
import Timer from './components/Timer';
import Counter from './components/Counter';
import React from 'react';
import Databasetest from './components/Databasetest';
import Loading from './components/Loading';
import Graphic from './components/Graphic';


class App extends React.Component {
  render() {
    return (
      <div className="App">
      	{/* <Loading /> */}
				<Timer />
				<Counter />
				{/* <input type="date"></input> */}
        <Databasetest />
      	<Loading />
				<input className="calendar" type="date" value="today"></input>
				<Graphic />
      </div>
    );
  }
}

export default App;
