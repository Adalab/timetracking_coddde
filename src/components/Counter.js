import React from 'react';

const ButtonGroup = (props) => (
  <div className="button-group">
    <span onClick={props.onStart}>{props.stopped ? 'Start' : 'Pause'}</span>
    <span onClick={props.onReset}>Reset</span>
  </div>
)

class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      seconds: 0,
      stopped: true
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState({
      seconds: this.state.seconds + 1
    })
  }

  handleStart() {
    if (this.state.stopped) {
      this.timerID = setInterval(() => this.tick(), 1000)
      this.setState({ stopped: false })
    } else {
      clearInterval(this.timerID)
      this.setState({ stopped: true })
    }
  }

  handleReset() {
    clearInterval(this.timerID)
    this.setState({ seconds: 0, stopped: true })
  }

  correctValueFormat(value) {
    return value < 10 ? '0' + value : value
  }

  transformTime() {
    const current = this.state.seconds;
    const hours = Math.floor((current % (60 * 60 * 24)) / (60 * 60))
    const minutes = Math.floor((current % (60 * 60)) / 60)
    const seconds = Math.floor((current % 60))

    return {
      hours: this.correctValueFormat(hours),
      minutes: this.correctValueFormat(minutes),
      seconds: this.correctValueFormat(seconds)
    }
  }

  render() {
    const { hours, minutes, seconds } = this.transformTime()
    return (
      <div className="wrapper">
        <ButtonGroup
          onStart={() => this.handleStart()}
          onReset={() => this.handleReset()}
          stopped={this.state.stopped}
        />
        <div className="timer">
          {hours} : {minutes} : {seconds}
        </div>
      </div>
    )
  }
}

export default Counter;
