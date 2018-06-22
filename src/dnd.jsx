import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import React from 'react'
import Card from './Card.jsx'
import classNames from 'classnames'
const update = require('immutability-helper');
import Loader from 'react-loader-spinner'

class Dnd extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			cards: this.props.list,
			activeId: -1,
			isCardClicked: null
		}

		this.handleEmptyClick = (e) => {
			this.setState({
				activeId: -1,
				isCardClicked: false,
				isDbClicked: null
			})
		}

		this.handleSelect = (e, cardId) => {
			const time = Date.now()
			if(time - this.handleSelect._clickTime < 500){
				this.setState({isDbClicked:cardId})
			} 
			this.handleSelect._clickTime = time;

			e.stopPropagation();
			if(e.target.classList.contains("ratingButton")) return;
			this.setState({activeId: cardId})	
		}

		this.handleDoubleClick = (e,index) => {
			e.stopPropagation();
			if(!this.state.isCardClicked) {
				this.handleDoubleClick._values.length=0;
			}
			this.setState({isCardClicked: true})
			this.handleDoubleClick._values.push(index);		

			if(this.handleDoubleClick._values.length !== 2)	return

			if(this.handleDoubleClick._values[0] !== this.handleDoubleClick._values[1]) 
			{
				this.props.updateOrder(false, Object.assign([],this.handleDoubleClick._values));
				this.setState({activeId: -1})	
			}
			this.setState({isDbClicked:null});
			this.handleDoubleClick._values.length = 0;
		}
		this.handleDoubleClick._values = [];

		this.moveCard = (dragIndex, hoverIndex) => {
			const { cards } = this.state;
			const dragCard = cards[dragIndex]

			this.setState(
				update(this.state, {
					cards: {
						$splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
					},
				}),
			)
		}

		this.getIndex = (i) => {
			return i == this.state.cards.indexOf(this.state.cards.filter(item => item.question_id == this.state.isDbClicked)[0])
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.list !== prevProps.list) {
			this.setState({cards:this.props.list});
		}
	}


	render(){	
		const {isFetched, updateRating} = this.props;
			if(this.props.isFetching) return <p className="spinner"><Loader  type="Puff" color="#b44346"/></p>
			if(!isFetched || !this.state.cards) return null
			return (
							<div className= "card_container" onClick = {this.handleEmptyClick}>
								{this.state.cards.map((card,i) => 
									 <div 
									 	 key={card.question_id}>
											<Card
												onClick = {(e) => this.handleSelect(e,card.question_id)} 
												onDoubleClick={(e) => this.handleDoubleClick(e, i)}
												handleMinusClick={updateRating.bind(null,card.question_id,false)}
												handlePlusClick={updateRating.bind(null,card.question_id,true)}
												updateOrder={this.props.updateOrder}
												id={card.question_id}
												index={i}
												isAnswered = {card.is_answered}
												isDbClicked = {this.getIndex(i)}
												activeId = {this.state.activeId}
												moveCard={this.moveCard}
												creationDate={card.creation_date}
												viewCount={card.view_count}
												owner={card.owner.display_name}
												title={card.title}
												score={card.score}
												/>
									 </div>
									)
								}
							</div>  			
			)
	}
}

export default DragDropContext(HTML5Backend)(Dnd)