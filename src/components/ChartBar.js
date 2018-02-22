import React from 'react';
import { Chart } from 'primereact/components/chart/Chart';

class ChartBar extends React.Component {
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

		var data = {
				labels: namestasles,
				datasets: [
						{
								label: 'My First dataset',
								backgroundColor: '#42A5F5',
								borderColor: '#1E88E5',
								data: counters
						},
						// {
						//     label: 'My Second dataset',
						//     backgroundColor: '#9CCC65',
						//     borderColor: '#7CB342',
						//     data: [28, 48, 40, 19, 86, 27, 90]
						// }
				]
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
          <div>
              <div className="content-section introduction">
                  <div className="feature-intro">
                      <h1>Tiempo invertido</h1>
                      <p>Tiempo invertido en proyectos y tareas.</p>
                  </div>
              </div>

							{ this.selectProject() }

							<div className="content-section implementation">
                  <Chart id="barras" type="bar" data={this.state.taskData} className="chartBar"/>
              </div>
          </div>
				)
}
}

export default ChartBar;
