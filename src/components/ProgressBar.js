import React from 'react';
import firebase from 'firebase';


class ProgressBar extends React.Component {
	// constructor(props) {
	// 	super(props)
	// 	this.handleDates = this.handleDates.bind(this);
	// 	this.slectDates = this.selectDates.bind(this);
	// 	this.state = {
	// 		projectsFiltered: '',
	// 		taskData: '',
	// 		projectName: 'Project'
	// 	}
	// }
	//
	// handleDates (event) {
	// 	let dayFiltered = event.currentTarget.value;
	// 	let filteredTasks = this.props.tasks.filter(filterTask =>
	// 		filterTask.date.includes(dayFiltered));
	// 	let progressTaskName = filteredTasks.map(element => element.taskName);
	// 	let progressCounter = filteredTasks.map(element => element.counter);
	//
	// 			let arrayProject = this.props.selectProjects;
	// 			let projectSelected = arrayProject.filter(project => project.projectId.includes(projectsFiltered));
	//
	// 			this.setState({
	// 				projectName: projectSelected[0].projectName
	// 			})
	// 		}
	//
	// selectDate(){
	// 	let taskCounter = this.props.tasks;
	// 	let totalCounter = this.props.tasks.counter;
	// 	return(
	// 		<div>
	// 			<select className="add project__btn" onChange={this.handleDates}>
	// 			<option>Select a Day</option>
	// 						{
	// 							taskCounter.map(
	// 								taskCount =>
	// 								<option value={taskCount.date}>{taskCount.date}</option>
	// 							)
	// 						}
	// 					</select>
	// 				</div>);
	// 		}
	//
	// 		paintProgress() {
	// 			let tasksToShow = this.props.tasks;
	// 			return (
	// 				<div className="task__list">
	// 					{tasksToShow.map(
	// 						(task) => <div width={task.counter}>{task.taskName}</div>)
	// 					}
	// 				</div>);
	// 		}

			render() {

				return (
					<div className="component_container">
						// <div className="content-section introduction">
						// 	<div className="feature-intro">
						// 		<h1>{this.state.projectName}</h1>
						// 		<p>Invested time of the tasks in a project</p>
						// 	</div>
						// </div>
						// { this.selectDate() }
						//
						//
						// {this.paintProgress()}
					</div>
				)
			}
		}


export default ProgressBar;
