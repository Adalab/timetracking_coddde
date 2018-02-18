import React from 'react';
import Loading from './components/Loading';
import firebase from 'firebase';
import Projects from './components/Projects';
import Task from './components/Task';
import Databasetest from './components/Databasetest';
import Timer from './components/Timer';
import Counter from './components/Counter';
import Login from './pages/Login';
import Graphic from './components/Graphic';
import ChartBar from './components/ChartBar';
// import User from './pages/User';
import {reactLocalStorage} from 'reactjs-localstorage';


class App extends React.Component {
	constructor (props) {
		super (props);

		this.handleLogout = this.handleLogout.bind(this);
		this.handleInputProject = this.handleInputProject.bind(this)
		this.handleInputTask = this.handleInputTask.bind(this);
		this.selectProject = this.selectProject.bind(this);
		// this.recoverLastProjectKey = this.recoverLastProjectKey.bind(this);

		this.state = {
			user: null,
			logged: false,
			inputProject: '',
			projects: [],
			// idProject: '',
			tasks: [],
			inputTask: ''

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

	//transformamos el valor añadido en el input en el estado que se va a usar luego (inputTask)
	handleInputTask(e) {
		this.setState({
			inputTask: e.target.value
		});
	}

	//El select lo vamos a reutilizar en el componente ChartBar y en la página principal
	selectProject(){
		let arrayProject = this.state.projects;

		return(<select className="">
			<option>Selecciona un proyecto</option>
			{
				arrayProject.map(
					project =>
						<option>{project.projectName}</option>
				)
			}
		</select>);
	}

	// recoverLastProjectKey() {
	// 	//Nos trae el valor del último nodo introducido en projects
	// 	firebase.database().ref('projects').limitToLast(1).on('child_added', 	childSnapshot=> {
	// 		//Para recuperar el ultimo key
	// 		const lastProjectKey = childSnapshot.key
	// 		console.log(`Éste sería el key que acabas de introducir ${lastProjectKey}`);
	// 		//Para recuperar el último nodo
	//  		const snap = childSnapshot.val();
	//  		//Recupero el valor de la clave projectName del ultimo nodo introducido
	//  		console.log(`Objeto snap ${snap.projectName}`);
	// 		//Lo meto en el estado para poder usarlo luego
	// 		this.setState({
	// 			idProject: lastProjectKey
	// 		})
	//  	});
	// }
  render() {
		if(this.state.user) {

			return (
      <div className="App">
				<p>Bienvenido/a {this.state.user.displayName}</p>
				<img className="image--user" src={this.state.user.photoURL} alt={this.state.user.displayName} />
				<button onClick={this.handleLogout}>Salir</button>
      	{/* <Loading /> */}
				{/* <Login
					// renderLoginButton={this.renderLoginButton()}
					handleAuthGoogle = {this.handleAuthGoogle}
				/> */}
				<Timer />
				{/* <Counter user={this.state.user} /> */}
				<Projects
					user={this.state.user}
					inputProject={this.state.inputProject} handleInputProject={this.handleInputProject}
					projects={this.state.projects}
				/>
				<Task
					user={this.state.user}
					inputTask={this.state.inputTask} handleInputTask={this.handleInputTask}
					tasks={this.state.tasks}
					selectProject={this.selectProject()}
					// recoverLastProjectKey={this.recoverLastProjectKey()}
					// idProject={this.state.idProject}
					handleInputProject={this.handleInputProject}
					inputProject={this.state.inputProject}

				/>
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
