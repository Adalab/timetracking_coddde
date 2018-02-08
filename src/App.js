import React, { Component } from 'react';
import firebase from 'firebase';

class App extends Component {
	constructor (props) {
		super (props);
		this.state = {
			email: '',
			password: ''
		}
	}
	handleAuthGoogle () {
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider)
			.then(result => console.log(`${result.user.email} ha iniciado sesión`))
			.catch(error => console.log(`Error ${error.code}:${error.message}`));
	}
	handleAuthEmail () {

			const email = this.state.email;
			const password = this.state.password;

			firebase.auth().signInWithEmailAndPassword(email, password)
	//		.then(result => console.log(`${result.user.email} ha iniciado sesión`))
		  .catch(error => console.log(`Error ${error.code}:${error.message}`));
	}


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
				<form className="login__form">
					<input className="login__input" type="text" placeholder="E-mail" ref="email" onChange={email => this.state ({email})} />{this.state.email}

					<input className="login__input" type="password"  placeholder="Password" ref="password" onChange={password => this.state ({password})} />{this.state.password}
					<button className="login__button" onClick={this.handleAuthEmail}>Log-in</button>
					<button className="login__button" onClick={this.handleAuthGoogle}>Log in con Google
					</button>
				</form>
      </div>
    );
  }
}

export default App;
