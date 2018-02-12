import React from 'react';
import Login from './pages/Login';
import firebase from 'firebase';
import Timer from './components/Timer';
import { Link,Route, Switch } from 'react-router-dom';


class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			logged: false,
			user: {}
		}
	}
	setUser(user) {
		this.setState({
			user: '',
			logged: true
		});
	}
  render() {

		console.log('render')

		return (
			<Switch>
				<Route exact path='/' render={() => <Login onLoginSuccess = {this.setUser} />}/>
				<Route path='/Timer' component={Timer}/>
			</Switch>
		);
  }
}

export default App;
