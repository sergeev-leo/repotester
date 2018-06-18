import React from 'react';

class LoadButton extends React.Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		this.props.onClick(this.props.url)();
	}

	render() {
		return this.props.isVisible ? <a className = "loadButton" onClick={this.props.onClick(this.props.url)}> Загрузить  </a> : ""
	}
}

export default LoadButton;