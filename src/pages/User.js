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
			});
			// console.log(snapshot.val());
			console.log(this.state.projects);
			console.log(`Este es el listado de los keys de los proyectos ${snapshot.key}`);
		})
	}

	addProject(){
		const objectProject = {
			projectName: this.state.inputProject,
			projectUser: this.props.user.uid
		}
		const dbRefProject = firebase.database().ref('projects');
		dbRefProject.push(objectProject);

		//Nos trae el valor del último nodo introducido en projects
		firebase.database().ref('projects').limitToLast(1).on('child_added', 	childSnapshot=> {

				//Para recuperar el ultimo key
				const lastKey = childSnapshot.key
				console.log(`Éste sería el key que acabas de introducir ${lastKey}`);

				//Para recuperar el último nodo
     		const snap = childSnapshot.val();

		 		//Recupero el valor de la clave projectName del ultimo nodo introducido
		 		console.log(`Objeto snap ${snap.projectName}`);

				//Lo meto en el estado para poder usarlo luego
				this.setState({
					idProject: lastKey
				})
	 		});
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
		//No borrar de momento para tenerlo como referencia
		// console.log(`Id de ultimo proyecto llamado desde render ${this.state.idProject}`);
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
