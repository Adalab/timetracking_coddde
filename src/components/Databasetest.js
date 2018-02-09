import React from 'react';
import firebase from 'firebase';


class Database extends React.Component {
	constructor (props) {
		super (props)
		this.state = {
			name: '',
			surname: '',
			email: '',
			password: ''
		}
	}

	componentWillMount () {
		const nameRef = firebase.database().ref().child('usuario').child('name')
		const surnameRef = firebase.database().ref().child('usuario').child('surname')
		const emailRef = firebase.database().ref().child('usuario').child('email')
		const passwordRef = firebase.database().ref().child('usuario').child('password')

		nameRef.on('value',(snapshot) => {
			this.setState({
				name: snapshot.val()
			})
		})
		surnameRef.on('value',(snapshot) => {
			this.setState({
				surname: snapshot.val()
			})
		})
		emailRef.on('value',(snapshot) => {
			this.setState({
				email: snapshot.val()
			})
		})
		passwordRef.on('value',(snapshot) => {
			this.setState({
				password: snapshot.val()
			})
		})
	}
	render() {
		return (
			<div>
				<h1>Hola {this.state.name}{this.state.surname} con email {this.state.email} y contraseña {this.state.password}</h1>
			</div>)
	}
}


export default Database;
