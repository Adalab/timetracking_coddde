import React from 'react';

class Header extends React.Component {
	render() {
		return (
			<div className="header">
				<img className="logo" alt="logo" src=""/>
				<div className="app_title">
					<span className="app_name"></span>
					<button className="reports_button"></button>
				</div>
				<div className="login">
					<div className="info--user">
						<img className="image--user" src={this.props.url} alt={this.props.email} />
						<p className="welcome--user">{/*Bienvenido/a*/} {this.props.displayName}
						{/*{this.props.email}*/}
						</p>
					</div>
					<button className="btn_exit--user" onClick={this.props.handleLogout}>Salir</button>
				</div>

			</div>
		);
	}
}

export default Header;
