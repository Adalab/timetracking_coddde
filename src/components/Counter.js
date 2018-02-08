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
			stopClick: false
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
			<ul>
				{tasksToShow.map(
					task => <li>
						{task.taskName}, {this.formatTime(task.counter)}
					</li>
				)}
			</ul>);
  }




	render () {

		return (
			<div className='timer'>
				<counter >{this.display()}</counter>
				<div  className="buttons">
					<button  type="button" name="start_btn" id="start_btn" onClick={this.startTimer}>Start</button>
					<button  type="button" name="stop_btn" id="stop_btn" onClick={this.pauseTimer}>Pause</button>
					<button  type="button" name="reset_btn" id="reset_btn" onClick={this.stopTimer}>Stop</button>
				</div>
				{this.paintTasks()}
			</div>
		)
	}
}

export default Counter;
