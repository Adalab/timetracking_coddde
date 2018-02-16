// import React from 'react';
//
// class Timer extends React.Component{
// 	constructor (props) {
// 		super(props)
//
// 		this.updateClock=this.updateClock.bind(this);
//
// 		setInterval (this.updateClock,1000);
//
// 		this.state = {
// 			hours: '',
// 			minutes: ''
// 		}
// 	}
//
// 	updateClock () {
// 		this.setState ({
// 		hours: new Date().getHours(),
// 		minutes: new Date().getMinutes()
// 		});
// 	}
//
// 	render(){
// 		return(
// 			<div className="timer__clock">
// 				{this.state.hours}:
// 				{this.state.minutes}
// 			</div>
// 		);
// 	}
// }
//
// export default Timer;
