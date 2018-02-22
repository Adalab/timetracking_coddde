import React from 'react';

//import { Chart } from '../primeReact/components/chart/Chart';
import {Chart} from '../primeReact/components/chart/Chart';

class Graphic extends React.Component {
	render() {
        var data = {
            labels: ['Tarea 1','Tarea 2','Tarea 3'],
            datasets: [
                {
                    data: [100, 50, 100],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]
            };

        return (
            <div className="component_container">
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>Proyecto 1</h1>
                        <p>Tiempo invertido de tareas en el proyecto</p>
                    </div>
                </div>

                <div className="content-section implementation">
                    <Chart type="doughnut" data={data} />
                </div>
            </div>
					)
}
}

export default Graphic;
