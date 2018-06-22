import React from 'react';

class LoadButton extends React.Component {

	componentDidMount() {
		this.props.onClick();
	}

	render() {
		return this.props.isVisible ? <a className = "loadButton" onClick={this.props.onClick}> Загрузить  </a> : null
	}
}

export default LoadButton;