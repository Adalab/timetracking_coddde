import React from 'react';
import firebase from 'firebase';
import {Dialog} from 'primereact/components/dialog/Dialog';


class Login extends React.Component {
	constructor (props) {
		super (props)

		this.handleAuthEmail = this.handleAuthEmail.bind(this);
		this.handleAuthGoogle = this.handleAuthGoogle.bind(this);
		this.handleNewUser = this.handleNewUser.bind(this);
		this.recoverPass = this.recoverPass.bind(this);
		this.onClick = this.onClick.bind(this);
		this.onHide = this.onHide.bind(this);

		this.state = {
			email: '',
			password: '',
			visible: false
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
		this.setState ({ visible: false});
	}

	recoverPass(){
		let auth = firebase.auth();
		let emailAdress = this.state.email;

		auth.sendPasswordResetEmail(emailAdress)
			.then(function(){
				//Email send
			})
			.catch(function(error){
				//An error happened
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

	onClick(event) {
	    this.setState({visible: true});
	}

	onHide(event) {
	    this.setState({visible: false});
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
						<Dialog header="" className="newUser-window" visible={this.state.visible} width="350px" modal={true} onHide={this.onHide}>
							<input name="onLoginSuccess" value={this.state.email} className="login__input" type="text" placeholder="E-mail" ref="email" onChange={e => this.handleInputChange('email', e.target.value)}/>
							<input value={this.state.password} className="login__input" type="password"  placeholder="Password" ref="password" onChange={e => this.handleInputChange('password', e.target.value)}/>
							<button className="login__button" type="button" onClick={this.handleNewUser}>Create new user</button>
						</Dialog>

						<button label="Show" className="login__button" type="button" icon="fa-external-link-square" onClick={this.onClick}>New user</button>

						<button className="login__button" type="button" onClick={this.recoverPass}>Forgot Password
						</button>
						{/* { this.props.renderLoginButton } */}
					</div>
				</form>
			</div>
		);
	}
}

export default Login;
