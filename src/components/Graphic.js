import React from 'react';

//import { Chart } from '../primeReact/components/chart/Chart';
import {Chart} from '../primeReact/components/chart/Chart';

class Graphic extends React.Component {
	render() {
        var data = {
            labels: ['A','B','C'],
            datasets: [
                {
                    data: [300, 50, 100],
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
            <div>
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>DoughnutChart</h1>
                        <p>A doughnut chart is a variant of the pie chart, with a blank center allowing for additional information about the data as a whole to be included.</p>
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
