import React from 'react';
import firebase from 'firebase';
import { Link, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Projects from './components/Projects';
import Databasetest from './components/Databasetest';
import CountTask from './components/CountTask';
import Login from './pages/Login';
import Graphic from './components/Graphic';
import ChartBar from './components/ChartBar';
import {reactLocalStorage} from 'reactjs-localstorage';

class App extends React.Component {
	constructor (props) {
		super (props);

		this.handleLogout = this.handleLogout.bind(this);
		this.handleInputProject = this.handleInputProject.bind(this);
		this.addProject = this.addProject.bind(this);
		this.setLastProyectId = this.setLastProyectId.bind(this);
		this.handleInputTask = this.handleInputTask.bind(this);

		this.state = {
			user: null,
			logged: false,
			inputProject: '',
			projects: [],
			idProject: '',
			idProjects: [],
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
			console.log(project);
			this.setState ({
				projects: this.state.projects.concat(project),//devuelve un array nuevo basado en el anterior con los nuevos datos
			});
		})



		//Almaceno en el array idProjects todos los id de los proyectos
		firebase.database().ref('projects').limitToLast(1).on('child_added', 	childSnapshot=> {
			this.setState({
				idProject: childSnapshot.key
			})
		}).bind(this);
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
	}

	//recogemos el valor del input de proyectos
	handleInputProject (event) {
		this.setState ({
			inputProject: event.target.value
		})
	}
	//recogemos el valor del input de tareas
	handleInputTask(e) {
		this.setState({
			inputTask: e.target.value
		});
	}

	addProject(){
		const objectProject = {
			projectName: this.state.inputProject,
			projectUser: this.state.user.uid
		}
		const dbRefProject = firebase.database().ref('projects');
		dbRefProject.push(objectProject);

			//Para recuperar el ultimo key
			// const idProject = childSnapshot.key;
			// console.log(`Éste sería el key que acabas de introducir ${idProject}`);
			// //Para recuperar el último nodo
			// 	const snap = childSnapshot.val();
			// 	//Recupero el valor de la clave projectName del ultimo nodo introducido
			// 	console.log(`Objeto snap ${snap.projectName}`);
			// // Lo meto en el estado para poder usarlo luego
	}

	setLastProyectId(){
		//Nos trae el valor de la clave de la última instancia introducida en projects
		firebase.database().ref('projects').limitToLast(100000).on('child_added', 	childSnapshot=> {
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
					{/* <Login
						// renderLoginButton={this.renderLoginButton()}
						handleAuthGoogle = {this.handleAuthGoogle}
					/> */}
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
								handleInputProject={this.handleInputProject}
								addProject={this.addProject}
								setLastProyectId={this.setLastProyectId}
								inputProject={this.state.inputProject}
								idProject={this.state.idProject}/> }
						/>
						<Route path='/Graphics' render={() => <Graphic
							selectProjects={this.state.projects}
						 	filterTaskSelect={this.state.tasks}
							/> }
						/>
					</Switch>
				</div>
			);
		}
		return (<Login
			onLoginSuccess = {this.setUser}
			handleAuthGoogle = {this.handleAuthGoogle}
			handleAuthEmai = {this.handleAuthEmai}/>
		);
	}
}

export default App;
