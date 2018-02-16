import React from 'react';
import Loading from './components/Loading';
import firebase from 'firebase';
import Databasetest from './components/Databasetest';
import Counter from './components/Counter';
import Login from './pages/Login';
import Graphic from './components/Graphic';
import User from './pages/User';
import {reactLocalStorage} from 'reactjs-localstorage';


class App extends React.Component {
	constructor (props) {
		super (props)

		this.handleLogout = this.handleLogout.bind(this);

		this.state = {
			user: null,
			logged: false
		}
	}

	componentWillMount() {
		firebase.auth().onAuthStateChanged(user => {
			this.setState({
				user: user
			});
			console.log('El user es:');
			console.log(this.state.user);
		});
		reactLocalStorage.set('var', true);
		reactLocalStorage.get('var', true);
		reactLocalStorage.setObject('var', {'test': 'test'});
		reactLocalStorage.getObject('var');
	}

	setUser() {
		this.setState({
			logged:true
		});
	}
	handleLogout () {
		firebase.auth().signOut()
		.then(result => console.log(`${result.user.email} ha salido`))
		.catch(error => console.log(`Error ${error.code}:${error.message}`));
	}

  render() {
		if(this.state.user) {

			return (
      <div className="App">
				<p>Bienvenido/a {this.state.user.displayName}</p>
				<img className="image--user" src={this.state.user.photoURL} alt={this.state.user.displayName} />
				<button onClick={this.handleLogout}>Salir</button>
      	{/* <Loading /> */}
				{/* <Login
					// renderLoginButton={this.renderLoginButton()}
					handleAuthGoogle = {this.handleAuthGoogle}
				/> */}
				<User projects={this.state.projects}
							user={this.state.user} />
				<Timer />
				<Counter user={this.state.user} />
				{/* <input type="date"></input> */}
        <Databasetest />
				<input className="calendar" type="date" value="today"></input>
				<Graphic />
      </div>
			);
			}
		console.log('Loguéate');
		return (<Login
			onLoginSuccess = {this.setUser}
			handleAuthGoogle = {this.handleAuthGoogle}/>)
  }
}

export default App;
