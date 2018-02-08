import React from 'react';

class Counter extends React.Component {
	constructor (props) {
		super(props)

		this.state = {
			count: 0,
			secondsCount: 0,
			minsCount: 0,
			hoursCount: 0,
			customNumber: 0,
			lastInput: 0
		}
	}

	handleChange (e) {
		const value = e.target.value;
		this.setState({
			customNumber: value,
			lastInput: value
		});
	}

	componentWillUnmount () {
		clearInterval(this.timer)
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

	display () {
		let hours = Math.floor(this.state.count / 360);
		let minutes = Math.floor((this.state.count - (hours * 60)) / 60);
		let seconds = Math.floor((this.state.count - (minutes * 60)));

		let hoursStr = (hours < 10) ? ('0' + hours) : '' + hours;
		let minutesStr = (minutes < 10) ? ('0' + minutes) : '' + minutes;
		let secondsStr = (seconds < 10) ? ('0' + seconds) : '' + seconds;

		return (hoursStr + ':' + minutesStr + ':' + secondsStr);
	}

	startTimer () {
		clearInterval(this.timer)
		this.timer = setInterval(this.tick.bind(this), 1000)
		this.setState({ disabled: true })
	}

	stopTimer () {
		clearInterval(this.timer)
	}

	resetTimer () {
		clearInterval(this.timer)
		this.setState({count: 0, customNumber: this.state.lastInput})
		this.setState({ disabled: false })
	}

	render () {
		return (
			<div className='timer'>
				<h1 >{this.display()}</h1>
				<div  className="buttons">
					<button  type="button" name="start_btn" id="start_btn" onClick={this.startTimer.bind(this)}>Start</button>
					<button  type="button" name="stop_btn" id="stop_btn" onClick={this.stopTimer.bind(this)}>Pause</button>
					<button  type="button" name="reset_btn" id="reset_btn" onClick={this.resetTimer.bind(this)}>Stop</button>
				</div>
			</div>
		)
	}
}

export default Counter;
