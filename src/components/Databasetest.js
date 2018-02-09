import React from 'react';
import firebase from 'firebase';


class Database extends React.Component {
	constructor (props) {
		super (props)
		this.state = {
			name: ''
		}
	}

	componentWillMount () {
		const nameRef = firebase.database().ref().child('usuario').child('name')

		nameRef.on('value',(snapshot) => {
			this.setState({
				name: snapshot.val()
			})
		})
	}
	render() {
		return <h1>Hola {this.state.name}</h1>
	}
}


export default Database;
