import React from 'react';
import firebase from 'firebase';


class Database extends React.Component {
	constructor (props) {
		super (props)
		this.state = {
		usuario: '',
		}
	}

	componentWillMount () {
		const userRef = firebase.database().ref().child('usuario')

		userRef.on('value',(snapshot) => {
			this.setState({
				usuario: snapshot.val()
			})
		})
	}
	render() {
		return (
			<div>
				<h1>Hola {this.state.usuario.name}</h1>
			</div>)
	}
}


export default Database;
