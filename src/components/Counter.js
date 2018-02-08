import React from 'react';

class Counter extends React.Component {
  constructor (props) {
      super(props)
      this.state =
          {
              count: 0,
              customNumber: 0,
              lastInput: 0
          }
  }
				handleChange (e) {
                    const value = e.target.value;
                    this.setState({	customNumber: value, lastInput: value});
                }
                componentWillUnmount () {
                    clearInterval(this.timer)
                }
                tick () {
                    if (this.state.customNumber) {
											this.setState({
							count: (this.state.customNumber--)
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
                    return ('0' + this.state.count % 100).slice(-2)
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
