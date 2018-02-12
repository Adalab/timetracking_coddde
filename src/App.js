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
	componentWillMount () {
		const userRef = firebase.database().ref().child('users').child('user')
		userRef.on('value',(snapshot) => {
			this.setState({
				user: snapshot.val()
			})
		})
	}
	setUser(user) {
		this.setState({
			user: '',
			logged: true
		});
	}
  render() {
		if(!this.state.setUser) {
			console.log('vamos a log in')
			return (<Login onLoginSuccess = {this.setUser} />);
		}
		return (
			<h1>Hola user</h1>
		);
	}
}

export default App;
