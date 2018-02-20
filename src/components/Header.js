import React from 'react';

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
					{this.props.email}
				</p>
					<img className="image--user" src={this.props.url} alt={this.props.email} />
					<button onClick={this.props.handleLogout}>Salir</button>
				</div>
			</div>
		);
	}
}

export default Header;
