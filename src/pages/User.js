import React from 'react';
import firebase from 'firebase';

class User extends React.Component {
	constructor(props) {
		super(props)
		this.handleInputProject = this.handleInputProject.bind(this);
		this.addProject = this.addProject.bind(this);
		this.state = {
			inputProject: '',
			projects: []
		}
	}

	handleInputProject (event) {
		this.setState ({
			inputProject: event.target.value
		})
		console.log(this.state.inputProject);
	}

	componentWillMount () {
		firebase.database().ref('projects').on('child_added', snapshot => {
			this.setState ({
				projects: this.state.projects.concat(snapshot.val())
			});
			console.log('this.state.projects');
		})
	}

	addProject(){
		const objectProject = {
			projectName: this.state.inputProject,
			projectUser: this.props.user.uid
		}

		const dbRefProject = firebase.database().ref('projects');
		dbRefProject.push(objectProject);
	}

	render() {
		return(
			<div>
				<input type="text" placeholder="introduce el projecto" onChange={this.handleInputProject}/>
				<button type="button" onClick={this.addProject}>Añadir proyecto</button>
			</div>
		);
	}
}
export default User;
