import React from 'react';
import firebase from 'firebase';

class CountTask extends React.Component {
	constructor (props) {
		super(props);

		this.selectProject = this.selectProject.bind(this);
		this.formatTime = this.formatTime.bind(this);
		this.calculateFinalTime = this.calculateFinalTime.bind(this);
		this.formatTimeWithoutSeconds = this.formatTimeWithoutSeconds.bind(this);
		this.startTimer = this.startTimer.bind(this);
		this.stopTimer = this.stopTimer.bind(this);
		this.addTaskFirebase = this.addTaskFirebase.bind(this);
		this.paintTasks = this.paintTasks.bind(this);

		setInterval (this.updateClock,1000);

		this.state = {
			count: 0,
			customNumber: 0,
		}
	}

	selectProject(){
		let arrayProject = this.props.projects;

		return(<select className="addproject__btn" onChange={this.props.handleCreatedProjects}>
			<option>Select your project</option>
			{
				arrayProject.map(
					project =>
						<option value={project.projectId}>{project.projectName}</option>
				)
			}
		</select>);
	}

	tick () {
		if (this.state.customNumber) {
			this.setState({
				secondsCount: (this.state.customNumber--)
			});
			if (this.state.customNumber <= 0) {
				this.setState({
					count: 0
				})
				clearInterval(this.timer)
			}
		}
		else {
			this.setState({
				count: (this.state.count + 1)
			})
		}
	}

	formatTime (number) {
		let hours = Math.floor(number / 3600);
		let minutes = Math.floor((number / 60) - (hours * 60));
		let seconds = Math.floor((number - (minutes * 60) - (hours * 3600)));

		//pasamos los valores a un string para poder pintarlos después en el return
		let hoursStr = (hours < 10) ? ('0' + hours) : '' + hours;
		let minutesStr = (minutes < 10) ? ('0' + minutes) : '' + minutes;
		let secondsStr = (seconds < 10) ? ('0' + seconds) : '' + seconds;

		return `${hoursStr}:${minutesStr}:${secondsStr}`;
	}

	formatTimeWithoutSeconds (number) {
		let hours = Math.floor(number / 3600);
		let minutes = Math.floor((number / 60) - (hours * 60));

		//pasamos los valores a un string para poder pintarlos después en el return
		let hoursStr = (hours < 10) ? ('0' + hours) : '' + hours;
		let minutesStr = (minutes < 10) ? ('0' + minutes) : '' + minutes;

		return `${hoursStr}:${minutesStr}`;
	}

	calculateFinalTime(initTime, count){
		let hours = parseInt(initTime.split(':')[0]);
		let minutes = parseInt(initTime.split(':')[1]);

		let finalCount = (hours * 3600) + (minutes * 60) + count;

		let endHour = this.formatTimeWithoutSeconds(finalCount);

		return endHour;
	}

	display () {
		return this.formatTime(this.state.count);//usamos la función formatTime para iniciar el contador
	}

	startTimer () {
		let startHour = new Date()
		// Ponemos en marcha el contador
		clearInterval(this.timer)
		this.timer = setInterval(this.tick.bind(this), 1000)

		this.setState({
			lastStartTime: startHour
		})
	}

	addTaskFirebase () {
		//Objeto que irá dentro de la base de datos
		const objectTask = {
			createdBy: this.props.user.uid,
			taskName: this.props.inputTask,
			counter: this.state.count,
			initTime: this.state.lastStartTime.getHours() + ':' + this.state.lastStartTime.getMinutes(),
			projectId: this.props.idProject,
			projectName: this.props.inputProject
		};
		//Recogemos la referencia al array de tareas de la base de datos
		const dbRef =firebase.database().ref('tasks');
		//Insertamos la nueva tarea
		dbRef.push(objectTask);

	}

	stopTimer () {
		clearInterval(this.timer)

		this.addTaskFirebase();

		//reseteamos el contador
		this.setState({
			count: 0,
		});

		//Reseteamos todos los campos de los inputs
		this.props.resetInputs();
	}

	paintTasks() {
		let tasksToShow = this.props.tasks; //esto es como el ejemplo de los perros de Isra
		return (
			<div className="task__list">
				{tasksToShow.map(
					(task) => <ul className="task__item">
						<li>{ task.taskName }</li>
						<li>{ task.projectName} </li>
						<li>{ task.initTime }</li>
						<li>{ this.calculateFinalTime(task.initTime, task.counter) }</li>
						<li>{ this.formatTime(task.counter) }</li>
					</ul>).reverse()
				}
			</div>);
	}

	render () {

		return (
			<div className="component_container">
				<div className="timer">
					<input className="calendar" type="date"></input>
					{this.selectProject()}
					<input type="text" className="task__input" value={this.props.inputProject} placeholder="Name of new project" onChange={this.props.handleInputProject}/>
					<button className="addproject__btn" type="button" onClick={this.props.addProject}>Add new project</button>
					<input type="text" className="task__input" value={this.props.inputTask} placeholder="Title of your task" onChange={this.props.handleInputTask}/>
					<div className="timer__buttons">
						<counter className="timer__counter" >{this.display()}</counter>
						<button className="timer__btn timer__btn--play" type="button" name="start_btn" id="start_btn" onClick={this.startTimer}>▶</button>
						<button className="timer__btn timer__btn--stop" type="button" name="reset_btn" id="reset_btn" onClick={this.stopTimer}>■</button>
					</div>
				</div>
				<div className="task__container">
					<div className="task__title">
						<span>¿En qué estoy trabajando?</span>
						<span>Proyecto</span>
						<span>Hora de inicio</span>
						<span>Hora de fin</span>
						<span>Tiempo invertido</span>
					</div>
					{this.paintTasks()}
				</div>
			</div>
		);
	}
}

export default CountTask;
