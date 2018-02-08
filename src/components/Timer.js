import React from 'react';

class Clock extends React.Component{
	constructor (props) {
		super(props)

		this.updateClock=this.updateClock.bind(this);

		setInterval (this.updateClock,1000);

		this.state = {
			 hours: new Date().getHours(),
			 minutes: new Date().getMinutes(),
			 seconds: new Date().getSeconds()
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
			{this.state.minutes}:
			{this.state.seconds}
			</div>
		);
	}
}
