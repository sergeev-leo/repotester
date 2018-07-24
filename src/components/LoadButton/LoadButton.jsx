import React from 'react';

class LoadButton extends React.Component {
  componentDidMount() {
    this.props.onClick();
  }

  render() {
    return this.props.isVisible
      ? (
        <div className="load-button" onClick={this.props.onClick}>
          {'Загрузить'}
        </div>
      )
      : null;
  }
}

export default LoadButton;
