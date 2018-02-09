import React from 'react';
import './App.css';
import Login from './pages/Login.js';

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
		if (!this.state.logged)
			{
				console.log('Vamos a log in')
				return <Login onLoginSuccess = {this.setUser} />;
			}
		return <h1>Hola user</h1>
  }
}

export default App;
