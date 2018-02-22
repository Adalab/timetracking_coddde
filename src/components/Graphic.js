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


		let data = {
				labels: namestasles,
				datasets: [
						{
								data: counters,
								backgroundColor: [
										"#FF6384",
										"#36A2EB",
										"#FFCE56"
								],
								// hoverBackgroundColor: [
								// 		"#FF6384",
								// 		"#36A2EB",
								// 		"#FFCE56"
								// ]
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
        // var data = {
        //     labels: ['Tarea 1','Tarea 2','Tarea 3'],
        //     datasets: [
        //         {
        //             data: [100, 50, 100],
        //             backgroundColor: [
        //                 "#FF6384",
        //                 "#36A2EB",
        //                 "#FFCE56"
        //             ],
        //             hoverBackgroundColor: [
        //                 "#FF6384",
        //                 "#36A2EB",
        //                 "#FFCE56"
        //             ]
        //         }]
        //     };



        return (
            <div>
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
