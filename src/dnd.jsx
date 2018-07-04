import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import React from 'react';
import Loader from 'react-loader-spinner';
import Card from './Card';

const update = require('immutability-helper');

class Dnd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: this.props.list,
      activeId: -1,
      doubleClickedId: null,
    };

    this.singleClickTimeoutId = null;

    this.handleEmptyClick = (e) => {
      this.setState({
        activeId: -1,
        isDbClicked: null,
        doubleClickedId: null,
      });
    };

    this.handleClick = (e, cardId) => {
      e.stopPropagation();

      const click = () => {
        this.setState({ activeId: cardId });
        this.singleClickTimeoutId = null;
      };

      if (this.singleClickTimeoutId === null) {
        this.singleClickTimeoutId = setTimeout(click, 500);
      } else {
        this.handleDoubleClick(cardId);
        clearTimeout(this.singleClickTimeoutId);
        this.singleClickTimeoutId = null;
      }
    };


    this.handleDoubleClick = (cardId) => {
      if (this.state.doubleClickedId === null) {
        this.setState({ doubleClickedId: cardId });
        return;
      }

      if (this.state.doubleClickedId === cardId) return;

      const firstIndex = this.getIndex(this.state.doubleClickedId);
      const secondIndex = this.getIndex(cardId);

      this.props.updateOrder(false, [firstIndex, secondIndex]);
      this.setState({ activeId: -1, doubleClickedId: null });
    };

    this.moveCard = (dragIndex, hoverIndex) => {
      const { cards } = this.state;
      const dragCard = cards[dragIndex];

      this.setState(
        update(this.state, {
          cards: {
            $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
          },
        }),
      );
    };

    this.getIndex = id => this.state.cards
      .indexOf(this.state.cards
        .filter(item => item.question_id === id)[0]);
  }

  componentDidUpdate(prevProps) {
    if (this.props.list !== prevProps.list) {
      this.setState({ cards: this.props.list });
    }
  }


  render() {
    const { isFetched, updateRating, fetchError } = this.props;
    if (fetchError) {
      return (
        <div className="fetch-error">
          {fetchError.message}
        </div>
      );
    }
    if (this.props.isFetching) {
      return (
        <div className="spinner">
          <Loader type="Puff" color="#b44346" />
        </div>
      );
    }
    if (!isFetched || !this.state.cards) return null;
    return (
      <div className="card-container" onClick={this.handleEmptyClick}>
        {this.state.cards.map((card, i) => (
          <div
            key={card.question_id}
          >
            <Card
              onClick={e => this.handleClick(e, card.question_id)}
              handleMinusClick={updateRating.bind(null, card.question_id, false)}
              handlePlusClick={updateRating.bind(null, card.question_id, true)}
              updateOrder={this.props.updateOrder}
              id={card.question_id}
              index={i}
              isAnswered={card.is_answered}
              isDbClicked={this.state.doubleClickedId === card.question_id}
              activeId={this.state.activeId}
              moveCard={this.moveCard}
              creationDate={card.creation_date}
              viewCount={card.view_count}
              owner={card.owner.display_name}
              title={card.title}
              score={card.score}
												/>
          </div>
        ))
								}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Dnd);
