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
		const userRef = firebase.database().ref().child('users').child('user')

		userRef.on('value',(snapshot) => {
			this.setState({
				user: snapshot.val()
			})
		})
	}
	render() {
		return (
			<div>
				<h1>Hola {this.state.user.name}</h1>
			</div>)
	}
}


export default Database;
