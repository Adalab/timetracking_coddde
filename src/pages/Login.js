import React from 'react';
import firebase from 'firebase';

class Login extends React.Component {
	constructor (props) {
		super (props)

		this.handleAuthEmail = this.handleAuthEmail.bind(this);
		this.handleAuthGoogle = this.handleAuthGoogle.bind(this);
		this.handleNewUser = this.handleNewUser.bind(this);

		this.state = {
			email: '',
			password: ''
		}
	}
	handleNewUser(){
		//console.log('dite un cli');
		const email = this.state.email;
		const password = this.state.password;
		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
		console.log(errorMessage);
	  // ...
	});
	}
	handleAuthEmail () {
		const email = this.state.email;
		const password = this.state.password;
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(result => console.log(result, 'ha iniciado sesión'))
			.catch(error => console.log(`Error ${error.code}:${error.message}`));
			//console.log(email, password)
	}

	handleInputChange(input, value) {
		this.setState({
			[input]: value
		});
	}

	handleAuthGoogle () {
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider)
			// .then(result => console.log(result, 'ha iniciado sesión'))
			.then(result => console.log(`${result.user.email} ha iniciado sesión`))
			.catch(error => console.log(`Error ${error.code}:${error.message}`));
		}

	render() {
		return (
			<div className="login-container">
				<header className="form-header">
					<div className="form-title">
						<h1>FireTimer</h1>
						<p>Control your time production</p>
					</div>
				</header>
				<form className="login__form">
					<div className="login__inputs">
						<input name="onLoginSuccess" value={this.state.email} className="login__input" type="text" placeholder="E-mail" ref="email" onChange={e => this.handleInputChange('email', e.target.value)}/>
						<input value={this.state.password} className="login__input" type="password"  placeholder="Password" ref="password" onChange={e => this.handleInputChange('password', e.target.value)}/>
					</div>
					<div className="login__buttons">
						<button className="login__button" type="button" onClick={this.handleAuthEmail}>Log in</button>
						<button className="login__button" type="button" onClick={this.handleAuthGoogle}>Log in with Google
						</button>
						<button className="login__button" type="button" onClick={this.handleNewUser}>New User
						</button>
						{/* { this.props.renderLoginButton } */}
					</div>
				</form>
			</div>
		);
	}
}

export default Login;
