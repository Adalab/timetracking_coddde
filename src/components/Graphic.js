import React from 'react';

//import { Chart } from '../primeReact/components/chart/Chart';
import {Chart} from '../primeReact/components/chart/Chart';

class Graphic extends React.Component {

	constructor(props) {
		super(props)
		this.selectProject = this.selectProject.bind(this);
		this.handleFilteredProject = this.handleFilteredProject.bind(this);
		this.state = {
			projectsFiltered: '',
			taskData: ''
		}
	}
	handleFilteredProject (event) {
		let projectsFiltered = event.currentTarget.value;

		let filteredTasks = this.props.filterTaskSelect.filter(filterTask =>
			filterTask.projectId.includes(projectsFiltered));
		let namestasles = filteredTasks.map(element => element.taskName);
		let counters = filteredTasks.map(element => element.counter);
		let colours =["#b0c4de","#dda0dd","#2e8b57","#808000","#afeeee","#583202",
		"#f0e68c","#f08080","#ffff00","#0000ff","#3cb371","#4169e1","#800080","#ff8c00","#00ff7f","#ffd700","#008080","#4b0082","#c71585","#7b68ee","#db7093","#40e0d0","#d2b48c","#2e8b57","#ff0000","#ffc0cb","#00ffff","#0000cd","#800000"];

			let data = {
				labels: namestasles,
				datasets: [
					{
						data: counters,
						backgroundColor: colours,
						hoverBackgroundColor: colours
					}]
				};

				this.setState({
					taskData: data
				})
			}

			selectProject(){
				let arrayProject = this.props.selectProjects;
				return(<select className="" onChange={this.handleFilteredProject}>
					<option>selecciona un proyecto</option>
					{
						arrayProject.map(
							project =>
							<option value={project.projectId}>{project.projectName}</option>
						)
					}
				</select>);
			}

			render() {

				return (
					<div className="component_container">
						<div className="content-section introduction">
							<div className="feature-intro">
								<h1>Proyecto 1</h1>
								<p>Tiempo invertido de tareas en el proyecto</p>
							</div>
						</div>
						{ this.selectProject() }

						<div className="content-section implementation">
							<Chart type="doughnut" data={this.state.taskData} />
						</div>
					</div>
				)
			}
		}
		
		export default Graphic;
