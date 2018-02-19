import React from 'react';
import firebase from 'firebase';

class Header extends React.Component {
	render() {
		return (
			<div>
				<img alt="logo" src=""/>
				<div className="app_title">
					<span className="app_name"></span>
					<button className="reports_button"></button>
				</div>
				<div className="login">
					<p>Bienvenido/a {this.props.displayName}
					{this.props.name}
				</p>
					<img className="image--user" src={this.props.url} alt={this.props.name} />
					<button onClick={this.props.handleLogout}>Salir</button>
				</div>
			</div>
		);
	}
}

export default Header;
