import React from 'react';
import firebase from 'firebase';

class Task extends React.Component {
	constructor (props) {
		super(props)

		this.setLastProyectId = this.setLastProyectId.bind(this);
		this.addProject = this.addProject.bind(this);
		this.addTaskFirebase = this.addTaskFirebase.bind(this);
		this.startTimer = this.startTimer.bind(this);
		// this.pauseTimer = this.pauseTimer.bind(this);
		this.stopTimer = this.stopTimer.bind(this);
		this.paintTasks = this.paintTasks.bind(this);
		this.formatTime = this.formatTime.bind(this);

		this.state = {
			count: 0,
			customNumber: 0,
			stopClick: false,
			idProject: '',
		}
	}

	setLastProyectId(){
		//Nos trae el valor del último nodo introducido en projects
		firebase.database().ref('projects').limitToLast(1).on('child_added', 	childSnapshot=> {
			//Introducimos en el estado el id del último proyecto añadido
			this.setState({
				idProject: childSnapshot.key
			})
	 	}).bind(this);
		console.log(this.state.idProject);
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
			// const idProject = childSnapshot.key;
			// console.log(`Éste sería el key que acabas de introducir ${idProject}`);
			// //Para recuperar el último nodo
			// 	const snap = childSnapshot.val();
			// 	//Recupero el valor de la clave projectName del ultimo nodo introducido
			// 	console.log(`Objeto snap ${snap.projectName}`);
			// // Lo meto en el estado para poder usarlo luego
			this.setState({
				idProject: childSnapshot.key
			})
		}).bind(this);
	}

	addTaskFirebase () {
		this.setLastProyectId();
		//Objeto que irá dentro de la base de datos
		const objectTask = {
			createdBy: this.props.user.uid,
			taskName: this.props.inputTask,
			counter: this.state.count,
			projectId: this.state.idProject
		};
		//Recogemos la referencia al array de tareas de la base de datos
		const dbRef =firebase.database().ref('tasks');
		//Insertamos la nueva tarea
		dbRef.push(objectTask);
	}

	tick () {
		if (this.state.customNumber) {
			this.setState({
				secondsCount: (this.state.customNumber--)
			});
			if (this.state.customNumber <= 0) {
				this.setState({	count: 0})
				clearInterval(this.timer)
			}
		}
		else {
			this.setState({count: (this.state.count + 1)})
		}
	}

	formatTime (number) {
		let hours = Math.floor(number / 3600);
		let minutes = Math.floor((number - (hours * 60)) / 60);
		let seconds = Math.floor((number - (minutes * 60)));

		//pasamos los valores a un string para poder pintarlos después en el return
		let hoursStr = (hours < 10) ? ('0' + hours) : '' + hours;
		let minutesStr = (minutes < 10) ? ('0' + minutes) : '' + minutes;
		let secondsStr = (seconds < 10) ? ('0' + seconds) : '' + seconds;

		return `${hoursStr}:${minutesStr}:${secondsStr}`;
	}

	display () {
		return this.formatTime(this.state.count);//usamos la función formatTime para iniciar el contador
	}

	startTimer () {
		this.setLastProyectId();
		clearInterval(this.timer)
		this.timer = setInterval(this.tick.bind(this), 1000)
		this.setState({ disabled: true })
	}

	stopTimer () {
		clearInterval(this.timer);
		this.addTaskFirebase();
		//reseteamos el contador
		this.setState({
			count: 0,
			stopClick: true,
		});
	}

	paintTasks() {
		let tasksToShow = this.props.tasks; //esto es como el ejemplo de los perros de Isra
		return (
			<div className="project__container">
				<ul className="task__list">
					{tasksToShow.map(
						task => <li className="task__item">
							<span>{task.taskName}</span>
							<span>{this.formatTime(task.counter)}</span>
						</li>).reverse()
					}
				</ul>
			</div>);
	}

	render () {

		return (
			<div>
				<div className="timer">
					<div>
						{/* {this.props.selectProject} */}
						<div>
							<input type="text" placeholder="introduce el projecto" onChange={this.props.handleInputProject}/>
							<button onClick={this.setLastProyectId}>Estado</button>
							<button type="button" onClick={this.addProject}>Añadir proyecto</button>
						</div>
					</div>
					<input type="text" className="task__input" placeholder="Define brevemente tu tarea" onChange={this.props.handleInputTask}/>
					<counter className="timer__counter">{this.display()}</counter>
					<div className="timer__buttons">
						<button className="timer__btn timer__btn--play" type="button" name="start_btn" id="start_btn" onClick={this.startTimer}>Start</button>
						<button className="timer__btn timer__btn--stop" type="button" name="reset_btn" id="reset_btn" onClick={this.stopTimer}>Stop</button>
					</div>
				</div>
				<div className="task__container">
					{this.paintTasks()}
				</div>
			</div>
		)
	}
}

export default Task;
