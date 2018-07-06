import React from 'react';
import { loadState } from '../../sessionStorage';

class LoadButton extends React.Component {
  componentDidMount() {
    if (loadState('state') && loadState('state').fetchedData) return;
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
