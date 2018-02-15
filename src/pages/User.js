import React from 'react';
import firebase from 'firebase';

class User extends React.Component {
	constructor(props) {
		super(props)
		this.handleInputProject = this.handleInputProject.bind(this);
		this.addProject = this.addProject.bind(this);
		this.state = {
			inputProject: '',
			projects: [],
			idProject: '',
			idAllProjects: []
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
				projects: this.state.projects.concat(snapshot.val()),
	//			idProject: snapshot.key
			});
			console.log('this.props.projects');
			console.log(`Este willmount? ${snapshot.key}`);
		})
	}
	componentDidMount () {
		firebase.database().ref('projects').on('child_added', snapshot => {
			this.setState ({
				idProject: snapshot.key
			});
			console.log(`Este Didmount? ${snapshot.key}`);

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

	paintProject() {
		let projectToShow = this.state.projects;
		return (
			<div>
				{projectToShow.map(
					project => <p>{project.projectName}</p>
				).reverse()}</div>
		)
	}

	render() {
		return(
			<div>
				<input type="text" placeholder="introduce el projecto" onChange={this.handleInputProject}/>
				<button type="button" onClick={this.addProject}>Añadir proyecto</button>
				{this.paintProject()}
			</div>
		);
	}
}
export default User;
