import React from 'react';

class Timer extends React.Component{
	constructor (props) {
		super(props)

		this.updateClock=this.updateClock.bind(this);

		setInterval (this.updateClock,1000);

		this.state = {
			 hours: '',
			 minutes: '',
			 seconds: ''
		 }
 }

 updateClock () {
	 this.setState ({
 		 hours: new Date().getHours(),
 		 minutes: new Date().getMinutes(),
 		 seconds: new Date().getSeconds()
 	 })
 }

	render(){
		return(

			<div>
			{this.state.hours}:
			{this.state.minutes}
			</div>
		);
	}
}

export default Timer;
