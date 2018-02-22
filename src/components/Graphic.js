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
									"LightSkyBlue","Yellow","Green","HotPink","AliceBlue","AntiqueWhite","Aqua","Aquamarine","YellowGreen","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","GreenYellow","HoneyDew","IndianRed","Indigo","Ivory","Khaki","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke"
								],
								hoverBackgroundColor: [
										"LightSkyBlue","Yellow","Green","HotPink","AliceBlue","AntiqueWhite","Aqua","Aquamarine","YellowGreen","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","GreenYellow","HoneyDew","IndianRed","Indigo","Ivory","Khaki","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke"
								]
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
