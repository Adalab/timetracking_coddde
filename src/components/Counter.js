import React from 'react';
import firebase from 'firebase';

class Counter extends React.Component {
	constructor (props) {
		super(props)

		this.startTimer = this.startTimer.bind(this);
		this.pauseTimer = this.pauseTimer.bind(this);
		this.stopTimer = this.stopTimer.bind(this);
		this.paintTasks = this.paintTasks.bind(this);
		this.formatTime = this.formatTime.bind(this);
		this.handleInputTask = this.handleInputTask.bind(this);

		this.state = {
			count: 0,
			customNumber: 0,
			lastInput: 0,
			tasks: [],
			stopClick: false,
			inputTask: '',
			userId: this.props.user
		}
	}

	//Creamos un espacio(ref) en firebase, que se llamará "tasks", dentro del cual se van a ir añadiendo ("child_added") las tareas que se vayan capturando y usamos un método (concat) que los va a ir añadiendo uno detrás de otro
	componentWillMount () {
		firebase.database().ref('tasks').on('child_added', snapshot => {
			this.setState({
				tasks: this.state.tasks.concat(snapshot.val())
			});
			console.log(this.state.tasks);
		});
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
		clearInterval(this.timer)
		this.timer = setInterval(this.tick.bind(this), 1000)
		this.setState({ disabled: true })
	}

	pauseTimer () {
		clearInterval(this.timer)
	}

	//transformamos el valor añadido en el input en el estado que se va a usar luego (inputTask)
	handleInputTask(e) {
		this.setState({
			inputTask: e.target.value
		});
	}

	stopTimer () {
		clearInterval(this.timer)
		//Objeto que irá dentro de la base de datos
		const objectTask = {
			createdBy: this.props.user.uid,
			taskName: this.state.inputTask,
			counter: this.state.count,
			userId: this.state.userId.getUid()
		};
		//reseteamos el contador
		this.setState({
			count: 0,
			stopClick: true,
		});

		//Recogemos la referencia al array de tareas de la ba.getUid()se de datos
		const dbRef =firebase.database().ref('tasks');
		//Insertamos la nueva tarea
		dbRef.push(objectTask);
	}

	paintTasks() {
		let tasksToShow = this.state.tasks; //esto es como el ejemplo de los perros de Isra
		return (
			<ul className="task__list">
				{tasksToShow.map(
					task => <li className="task__item">
						<span>{task.taskName}</span>
						<span>{this.formatTime(task.counter)}</span>
					</li>).reverse()
				}
			</ul>);
	}

	render () {

		return (
			<div>
				<div className="timer">
					<input type="text" className="task__input" placeholder="Define brevemente tu tarea" onChange={this.handleInputTask}/>
					<counter className="timer__counter" >{this.display()}</counter>
					<div className="timer__buttons">
						<button className="timer__btn timer__btn--play" type="button" name="start_btn" id="start_btn" onClick={this.startTimer}>Start</button>
						{/* <button className="timer__btn timer__btn--pause" type="button" name="stop_btn" id="stop_btn" onClick={this.pauseTimer}>Pause</button> */}
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

export default Counter;
