import React from 'react';
import firebase from 'firebase';

class Projects extends React.Component {
	constructor(props) {
		super(props)
		this.addProject = this.addProject.bind(this);
		this.paintProject = this.paintProject.bind(this);
	}
	addProject(){
		const objectProject = {
			projectName: this.props.inputProject,
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
		let projectToShow = this.props.projects;
		return (
			<div className="projects-container">
				{projectToShow.map(
					project => <div><p>{project.projectName}</p><p>{project.taskID}</p></div>

				).reverse()}
			</div>);
	}
	render() {
		//No borrar de momento para tenerlo como referencia
		// console.log(`Id de ultimo proyecto llamado desde render ${this.state.idProject}`);
		return(
			<div>
				<input type="text" placeholder="introduce el projecto" onChange={this.props.handleInputProject}/>
				<button type="button" onClick={this.addProject}>Añadir proyecto</button>
				{this.paintProject()}
			</div>
		);
	}
}
export default Projects;
