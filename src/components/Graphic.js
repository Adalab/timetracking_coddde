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
		console.log(filteredTasks);
		// let TaskFor = '';
		// for (let i = 0; i < filteredTasks.length; i++) {
		// 	TaskFor = filteredTasks[i];
		// }
		let namestasles = filteredTasks.map(element => element.taskName);
		let counters = filteredTasks.map(element => element.counter);
		let colours =["#FAD74F","#F2B230","#F39D32","#F98F5F","#FD7A5C",
"#F9CD23","#F0A202","#F18805","#F9814B","#FC6745","#F9C80E","#C58502","#F87337",
"#FC4117","#CCA40C","#AF7602","#C67005","#E25D21","#FC2F00","#B6920B","#996802","#9A5704","#B54B1B","#E62B00","#886E08","#6E4A01","#583202","#583202","#B82300"];



		let data = {
				labels: namestasles,
				datasets: [
						{
								data: counters,
								backgroundColor: colours,
								hoverBackgroundColor: colours
						}]
				};

				//console.log(this.state.tareas);

				this.setState({
					taskData: data
				})
		/*
				this.setState({
					tareas: TaskFor
				})
		*/	}

			selectProject(){
				let arrayProject = this.props.selectProjects;
				//console.log(arrayProject)


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
