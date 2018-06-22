import React from 'react';
import classNames from 'classnames'
import { findDOMNode } from 'react-dom';
import {
  DragSource,
  DropTarget,
  ConnectDropTarget,
  ConnectDragSource,
  DropTargetMonitor,
  DropTargetConnector,
  DragSourceConnector,
  DragSourceMonitor,
} from 'react-dnd';
import { XYCoord } from 'dnd-core';
import flow from 'lodash/flow';
import moment from 'moment';
import styles from './styles.sass';

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    }
  },
  endDrag(CardProps, DragSourceMonitor) {
    const {id,index} = DragSourceMonitor.getItem();
    CardProps.updateOrder(true, {id,index} );
	}

};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }
    // Determine rectangle on screen
    const hoverBoundingRect = (findDOMNode(
      component,
    )).getBoundingClientRect();
    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    // Determine mouse position
    const clientOffset = monitor.getClientOffset();
    // Get pixels to the top
    const hoverClientY = (clientOffset).y - hoverBoundingRect.top;
    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%
    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }
    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }
    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);
    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
}

class Card extends React.Component {

  render() {
    const {
      connectDragSource,
      connectDropTarget,
      isDragging,
      isDbClicked,
      isAnswered,
      creationDate,
      id,
      activeId,
      handleMinusClick,
      handlePlusClick,
      onClick,
      onDoubleClick,
      owner,
      score,
      title,
      viewCount
    } = this.props;

    return (
      connectDragSource(
        connectDropTarget(
          <article 
            onClick={onClick}
            onDoubleClick={onDoubleClick} 
            className = {classNames({
              'card-wrap': true,
              'dbclicked': isDbClicked,
              'answered': isAnswered,
              'active': activeId == id,
              'opaque':  isDragging
             })}>            
                <section className="title">"{title}"</section>  
                <section className="ratingBlock">
                  <span className="score">Рейтинг: {score}</span>
                  <span className="ratingButton down" onClick={handleMinusClick}>u</span>
                  <span className="ratingButton up" onClick={handlePlusClick}>d</span>
                </section>
                {activeId == id ? 
                  <p>
                    <span>Дата создания:<span className="creationDate"> {moment.unix(creationDate).toString()}</span></span>
                    <span>Автор: <span className="owner">{owner}</span></span>
                    <span>Количество просмотров: <span className="viewCount">{viewCount}</span></span>
                  </p> : null}
          </article>
        )
      )
    );
  }
}

export default flow(
  DragSource(
    'card',
    cardSource,
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    }),
  ),
  DropTarget('card', cardTarget, (connect) => ({
    connectDropTarget: connect.dropTarget(),
  }))
)(Card);
