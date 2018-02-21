import React from 'react';
import { Chart } from 'primereact/components/chart/Chart';

class ChartBar extends React.Component {
	constructor(props) {
		super(props)
		this.selectProject = this.selectProject.bind(this);
		this.handleFilteredProject = this.handleFilteredProject.bind(this);
		this.state = {
			projectsFiltered: '',
			data: ''
		}
	}
	handleFilteredProject (event) {
		let projectsFiltered = event.currentTarget.value;
		let filteredTasks = this.props.tasks.filter(filterTask =>
		filterTask.projectId.includes(projectsFiltered));

		let filteredTaskName = [];
		let filteredTaskCounter = [];
		for (let i = 0; i < filteredTasks.length; i++) {
			filteredTaskName += filteredTasks[i].taskName;
			filteredTaskCounter += filteredTasks[i].counter

		}

		let data = {
				labels: [`${filteredTaskName}`],
				datasets: [
						{
								label: 'My First dataset',
								backgroundColor: '#42A5F5',
								borderColor: '#1E88E5',
								data: [`${filteredTaskCounter}`]
						},
						// {
						// 		label: 'My Second dataset',
						// 		backgroundColor: '#9CCC65',
						// 		borderColor: '#7CB342',
						// 		data: [28, 48, 40, 19, 86, 27, 90]
						// }
				]
		};
		this.setState({
			data: data
		})
	}

	selectProject(){
		let arrayProject = this.props.selectProjects;
		// console.log(arrayProject)

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
		// console.log(this.filteredTaskName);
		// console.log(this.filteredTaskCounter);
      // var data = {
      //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      //     datasets: [
      //         {
      //             label: 'My First dataset',
      //             backgroundColor: '#42A5F5',
      //             borderColor: '#1E88E5',
      //             data: [65, 59, 80, 81, 56, 55, 40]
      //         },
      //         {
      //             label: 'My Second dataset',
      //             backgroundColor: '#9CCC65',
      //             borderColor: '#7CB342',
      //             data: [28, 48, 40, 19, 86, 27, 90]
      //         }
      //     ]
      // };

      return (
          <div>
						<div className="content-section introduction">
							<div className="feature-intro">
								<h1>Tiempo invertido</h1>
								<p>Tiempo invertido en proyectos y tareas.</p>
							</div>
						</div>

						{ this.selectProject() }

						<div className="content-section implementation">
							<Chart  id="barras" type="bar" data={this.state.data} className="chartBar"/>
              </div>
          </div>
				)
}
}

export default ChartBar;
