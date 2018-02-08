import React from 'react';

class Loading extends React.Component{
 constructor (props) {
 	super(props);
	this.tick = this.tick.bind(this);
	this.componentDidMount = this.componentDidMount.bind(this);
	this.componentWillUnmount = this.componentWillUnmount.bind(this);

 this.state = {
    timer: null,
    counter: 0
  };
}
	tick() {
	    this.setState({
	      counter: this.state.counter + 1
	    });
	  }

componentDidMount() {
    let timer = setInterval(this.tick, 1000);
    this.setState({timer});
  }

	componentWillUnmount() {
    this.clearInterval(this.state.timer);
  }


	render(){

		return(
			<div>Loading{"...".substr(0, this.state.counter % 3 + 1)}</div>
			// <div>
			// {this.state.hours}:
			// {this.state.minutes}:
			// {this.state.seconds}
			// </div>
		);
	}
}

export default Loading;
