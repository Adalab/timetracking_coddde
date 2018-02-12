import React from 'react';

class Counter extends React.Component {
	constructor (props) {
		super(props)

		this.startTimer = this.startTimer.bind(this);
		this.pauseTimer = this.pauseTimer.bind(this);
		this.stopTimer = this.stopTimer.bind(this);
		this.paintTasks = this.paintTasks.bind(this);
		this.formatTime = this.formatTime.bind(this);

		this.state = {
			count: 0,
			customNumber: 0,
			lastInput: 0,
			tasks: [],
			stopClick: false,
		}
	}

	tick () {
		if (this.state.customNumber) {
			this.setState({
				secondsCount: (this.state.customNumber--)
			})
			if (this.state.customNumber <= 0) {
				this.setState({	count: 0})
				clearInterval(this.timer)
				this.setState({ disabled: false })
			}
		} else {
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
		return this.formatTime(this.state.count);//usamos la función formatTime para el contador
	}

	startTimer () {
		clearInterval(this.timer)

		this.timer = setInterval(this.tick.bind(this), 1000)
		this.setState({ disabled: true })
	}

	pauseTimer () {
		clearInterval(this.timer)
	}

	stopTimer () {
		clearInterval(this.timer)
		//recojo la referencia al array de tareas y al contador actual
		const { tasks, count } = this.state;
		tasks.push({taskName: 'taskName', counter: count}); //se añade una tarea nueva al array de tareas que luego tendremos que cambiar por el input que estemos usando
		this.setState({
			count: 0,
			stopClick: true,
			tasks: tasks //sobreescribe el array de tasks
		});
	}

	paintTasks() {
		let tasksToShow = this.state.tasks; //esto es como el ejemplo de los perros de Isra
		return (
			<ul className="task__list">
				{tasksToShow.map(
					task => <li className="task__item">
						<span>{task.taskName}</span>
						<span>{this.formatTime(task.counter)}</span>
					</li>
				)}
			</ul>);
	}

	render () {

		return (
			<div>
				<div className="timer">
					<counter className="timer__counter" >{this.display()}</counter>
					<div className="timer__buttons">
						<button className="timer__btn timer__btn--play" type="button" name="start_btn" onClick={this.startTimer}>Start</button>
						{/* <button className="timer__btn timer__btn--pause" type="button" name="stop_btn" onClick={this.pauseTimer}>Pause</button> */}
						<button className="timer__btn timer__btn--stop" type="button" name="reset_btn" onClick={this.stopTimer}>Stop</button>
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
