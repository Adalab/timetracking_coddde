import React from 'react';
import firebase from 'firebase';
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
			tasks: [],
			inputTask: '',
		}
	}

	componentWillMount() {
		firebase.auth().onAuthStateChanged(user => {
			this.setState({
				user: user
			});
			console.log('El user es:');
			console.log(this.state.user);
		});
		firebase.database().ref('projects').on('child_added', snapshot => {
			this.setState ({
				projects: this.state.projects.concat(snapshot.val()),
			});
			// console.log(this.state.projects);
			// console.log(`Este es el listado de los keys de los proyectos ${snapshot.key}`);
		})
		firebase.database().ref('tasks').on('child_added', snapshot => {
			this.setState({
				tasks: this.state.tasks.concat(snapshot.val())
			});
			console.log(this.state.tasks);
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

	handleInputProject (event) {
		this.setState ({
			inputProject: event.target.value
		})
		console.log(this.state.inputProject);
	}

	addProject(){
		const objectProject = {
			projectName: this.state.inputProject,
			projectUser: this.state.user.uid
		}
		const dbRefProject = firebase.database().ref('projects');
		dbRefProject.push(objectProject);

		//Al añadir el proyecto vamos a recuperar en ese momento la clave o id de esa instancia para poder usarla luego
		firebase.database().ref('projects').limitToLast(1).on('child_added', 	childSnapshot=> {
			this.setState({
				idProject: childSnapshot.key
			})
		}).bind(this);

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
		firebase.database().ref('projects').limitToLast(1).on('child_added', 	childSnapshot=> {
			//Introducimos en el estado el id del último proyecto añadido
			this.setState({
				idProject: childSnapshot.key
			})
		}).bind(this);
		console.log(this.state.idProject);
	}

	//transformamos el valor añadido en el input en el estado que se va a usar luego (inputTask)
	handleInputTask(e) {
		this.setState({
			inputTask: e.target.value
		});
	}

  render() {
		if(this.state.user) {

			return (
      <div className="App">
				<p>Bienvenido/a {this.state.user.displayName}</p>
				<img className="image--user" src={this.state.user.photoURL} alt={this.state.user.displayName} />
				<button onClick={this.handleLogout}>Salir</button>
				{/* <Login
					// renderLoginButton={this.renderLoginButton()}
					handleAuthGoogle = {this.handleAuthGoogle}
				/> */}
				<CountTask
					user={this.state.user}
					inputTask={this.state.inputTask}
					handleInputTask={this.handleInputTask}
					tasks={this.state.tasks}
					handleInputProject={this.handleInputProject}
					addProject={this.addProject}
					setLastProyectId={this.setLastProyectId}
					inputProject={this.state.inputProject}
					idProject={this.state.idProject}
				/>
				<Projects
					user={this.state.user}
					inputProject={this.state.inputProject} handleInputProject={this.handleInputProject}
					projects={this.state.projects} />
				{/* <input type="date"></input> */}
        <Databasetest />
				<input className="calendar" type="date"></input>
				<Graphic />
				<ChartBar selectProjects={this.state.projects} />
      </div>
			);
			}
		console.log('Loguéate');
		return (<Login
			onLoginSuccess = {this.setUser}
			handleAuthGoogle = {this.handleAuthGoogle}/>)
  }
}

export default App;
