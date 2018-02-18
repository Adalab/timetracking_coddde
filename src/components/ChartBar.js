import React from 'react';
import { Chart } from 'primereact/components/chart/Chart';

class ChartBar extends React.Component {
	constructor(props) {
		super(props)
		this.selectProject = this.selectProject.bind(this);
	}


	selectProject(){
		let arrayProject = this.props.selectProjects;

		return(<select className="">
						<option>selecciona un proyecto</option>
			{
				arrayProject.map(
					project =>
						<option>{project.projectName}</option>
				)
		}
	</select>);
	}

  render() {
      var data = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
              {
                  label: 'My First dataset',
                  backgroundColor: '#42A5F5',
                  borderColor: '#1E88E5',
                  data: [65, 59, 80, 81, 56, 55, 40]
              },
              {
                  label: 'My Second dataset',
                  backgroundColor: '#9CCC65',
                  borderColor: '#7CB342',
                  data: [28, 48, 40, 19, 86, 27, 90]
              }
          ]
      };

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
                  <Chart  id="barras" type="bar" data={data} className="chartBar"/>
              </div>
          </div>
				)
}
}

export default ChartBar;
