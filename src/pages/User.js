import React from 'react';

class User extends React.Component {
	constructor(props) {
		super(props)
			this.handleInputProject = this.handleInputProject.bind(this);
			this.state = {
				inputProject: ''
			}
	}

	handleInputProject (event) {
		this.setState ({
			inputProject: event.target.value
		})
	}
	// handleProject () {
	// 	this.setState ({
	//
	// 	})
	// }

	render() {
		return(
			<div>
				<input type="text" placeholder="introduce el projecto" onChange={this.handleInputProject}/>
				<button type="button" onClick={this.handleProject}>Añadir proyecto</button>
			</div>
		);
	}
}
export default User;
