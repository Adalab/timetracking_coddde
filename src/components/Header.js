import React from 'react';
import firebase from 'firebase';


class Header extends React.Component {
	render() {
		return (

			<div className="header">

				<img className="logo" alt="" src=""/>
				<h1 className="header_title">FireTimer</h1>

				<div className="login">
					<img className="image--user" src={this.props.url} alt={this.props.email} />
					<p className="welcome--user">{/*Bienvenido/a*/} {this.props.displayName}
						{/*{this.props.email}*/}
					</p>
					<button className="btn_exit--user" onClick={this.props.handleLogout}></button>
				</div>


			</div>
		);
	}
}

export default Header;
