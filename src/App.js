import React from 'react';
import firebase from 'firebase';
import Databasetest from './components/Databasetest';
// import Loading from './components/Loading';
import Timer from './components/Timer';
import Counter from './components/Counter';
import Login from './pages/Login';

class App extends React.Component {
	constructor (props) {
		super (props)
		this.state = {
			user: null,
		}
		this.handleAuthGoogle = this.handleAuthGoogle.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.renderLoginButton = this.renderLoginButton.bind(this);
	}

	componentWillMount() {
		firebase.auth().onAuthStateChanged(user => {
			this.setState({
				user: user
			});
			console.log(`El user es ${this.state.user}`);
		});
	}

	handleAuthGoogle () {
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider)
			// .then(result => console.log(result, 'ha iniciado sesión'))
			.then(result => console.log(`${result.user.email} ha iniciado sesión`))
			.catch(error => console.log(`Error ${error.code}:${error.message}`));
		}

	//Función para salir del logueado
	handleLogout () {
		firebase.auth().signOut()
		.then(result => console.log(`${result.user.email} ha salido`))
		.catch(error => console.log(`Error ${error.code}:${error.message}`));
	}

	renderLoginButton () {
		//Si el usuario está logeado
		if(this.state.user){
			return(
				<div>
					<p>Bienvenido/a {this.state.user.displayName}</p>
					<img className="image--user" src={this.state.user.photoURL} alt={this.state.user.displayName} />
					<button onClick={this.handleLogout}>Salir</button>
				</div>
			);
		} else {
			//Si no lo está
			return(
			<button className="login__button" type="button" onClick={this.handleAuthGoogle}>Log in con Google
			</button>
			);
		}
	}

  render() {
    return (
      <div className="App">
				<header className="App-header">
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<Login
					renderLoginButton={this.renderLoginButton()}
				/>
      	{/* <Loading /> */}
				<Timer />
				<Counter
					user={this.state.user}
				/>
				{/* <input type="date"></input> */}

        <div className="App-intro">
          <Databasetest />
        </div>
      </div>
    );
  }
}

export default App;
