import React from 'react';
import firebase from 'firebase';
import { Link, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Projects from './components/Projects';
import Databasetest from './components/Databasetest';
import CountTask from './components/CountTask';
import Login from './pages/Login';
import Graphic from './components/Graphic';
import {reactLocalStorage} from 'reactjs-localstorage';

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/omega/theme.css';

class App extends React.Component {
	constructor (props) {
		super (props);

		this.handleLogout = this.handleLogout.bind(this);
		this.handleInputProject = this.handleInputProject.bind(this);
		this.handleCreatedProjects = this.handleCreatedProjects.bind(this);
		this.addProject = this.addProject.bind(this);
		this.setLastProyectId = this.setLastProyectId.bind(this);
		this.handleInputTask = this.handleInputTask.bind(this);

		this.state = {
			user: null,
			logged: false,
			inputProject: '',
			projects: [],
			idProject: '',
			tasks: [],
			inputTask: '',
		}
	}

	componentWillMount() {
		firebase.auth().onAuthStateChanged(user => {
			this.setState({//se esta llamando aquí cuando se resetea la página por eso no se actualizan bien los estados al cambiar de un usuario a otro.
				user: user
			});

			firebase.database().ref('tasks').on('child_added', snapshot => {
				//solo añadimos la tarea si es del usuario actual.
				if(typeof(this.state.user) !== 'undefined' && this.state.user !== null && snapshot.val().createdBy === this.state.user.uid){
					this.setState({
						tasks: this.state.tasks.concat(snapshot.val())
					});
				}
			});

			firebase.database().ref('projects').on('child_added', snapshot => {
				const project = snapshot.val();
				project.projectId = snapshot.key;
				if(typeof(this.state.user) !== 'undefined' && this.state.user !== null && snapshot.val().projectUser === this.state.user.uid)
				this.setState ({
					projects: this.state.projects.concat(project),//devuelve un array nuevo basado en el anterior con los nuevos datos
				});
			})
		});
		reactLocalStorage.set('var', true);
		reactLocalStorage.get('var', true);
		reactLocalStorage.setObject('var', {'test': 'test'});
		reactLocalStorage.getObject('var');
	}

	setUser() {
		this.setState({
			logged:true
		});
	}

	handleLogout () {
		firebase.auth().signOut()
			.then(result => console.log(`${result.user.email} ha salido`))
			.catch(error => console.log(`Error ${error.code}:${error.message}`));
		this.setState({
			user: null,
			logged: false,
			inputProject: '',
			projects: [],
			idProject: '',
			tasks: [],
			inputTask: '',
		})
	}

	//Recogemos el valor del input de proyectos
	handleInputProject (event) {
		this.setState ({
			inputProject: event.target.value
		})
	}
	//Recogemos el valor del input de tareas
	handleInputTask(e) {
		this.setState({
			inputTask: e.target.value
		});
	}

	//Recogemos el valor del proyecto seleccionado en CountTask
	handleCreatedProjects (event) {
		let projectFiltered = event.currentTarget.value;

		this.setState({
			idProject: projectFiltered
		})
	}

	addProject(){
		const objectProject = {
			projectName: this.state.inputProject,
			projectUser: this.state.user.uid
		}
		const dbRefProject = firebase.database().ref('projects');
		dbRefProject.push(objectProject);

		//Al añadir el proyecto vamos a llamar a la función que nos va a devolver el id de proyecto que insertaremos posteriormente en la tarea.
		this.setLastProyectId()
	}

	setLastProyectId(){
		//Nos trae el valor de la clave de la última instancia introducida en projects
		firebase.database().ref('projects').limitToLast(1).on('child_added', 	childSnapshot=> {
			//Introducimos en el estado el id del último proyecto añadido
			this.setState({
				idProject: childSnapshot.key
			})
		}).bind(this);
	}

	render() {
		if(this.state.user) {
			return (
				<div className="App">
					<Header displayName={this.state.user.displayName}
						email={this.state.user.email}
						url={this.state.user.photoURL}
						handleLogout={this.handleLogout} />
					<ul className="window">
						<li className="list_menu"><Link className="nav_menu" to='/'>Home</Link>
						</li>
						<li className="list_menu"><Link className="nav_menu" to='/Graphics'>Informes</Link>
						</li>
					</ul>
					<Switch>
						<Route exact path='/' render={() =>
							<CountTask
								user={this.state.user}
								inputTask={this.state.inputTask}
								handleInputTask={this.handleInputTask}
								tasks={this.state.tasks}
								inputProject={this.state.inputProject}
								handleInputProject={this.handleInputProject}
								projects={this.state.projects}
								handleCreatedProjects={this.handleCreatedProjects}
								addProject={this.addProject}
								setLastProyectId={this.setLastProyectId}
								idProject={this.state.idProject}/> }
						/>
						<Route path='/Graphics' render={() =>
							<Graphic
								selectProjects={this.state.projects}
								filterTaskSelect={this.state.tasks}
							/> }
						/>
					</Switch>

				</div>

			);
		}
		return (<Login onLoginSuccess = {this.setUser}/>

		);
	}
}

export default App;
