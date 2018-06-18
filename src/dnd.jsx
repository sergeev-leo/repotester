import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import React from 'react'
import Card from './Card.jsx'
const update = require('immutability-helper');

class Dnd extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			cards: this.props.list,
			isActive: -1,
			isCardClicked: ''
		}

		this.handleEmptyClick = (e) => {
			if(!e.target.closest('div').classList.contains("card-wrap"))
			this.setState({
				isActive: -1,
				isCardClicked: false
			})
		}

		this.handleSelect = (e, index) => {
			if(e.target.classList.contains("ratingButton")) return;
			this.setState({isActive: index})	
		}

		this.handleDoubleClick = (e,index) => {
			
			if(!this.state.isCardClicked) {
				this.handleDoubleClick._values.length=0;
			}

			this.setState({isCardClicked: e.target.closest('div').classList.contains("card-wrap")})
			this.handleDoubleClick._values.push(index);		

			if(this.handleDoubleClick._values.length === 2) {

				if(this.handleDoubleClick._values[0] == this.handleDoubleClick._values[1]) 
				{
					this.handleDoubleClick._values.length = 0;
					return;
				}
				this.props.updateOrder(false, Object.assign([],this.handleDoubleClick._values));
				this.handleDoubleClick._values.length = 0;
				this.setState({isActive: -1})	
			}

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
			this.props.updateOrder(true,this.state.cards);
		}

	}

	componentDidUpdate(prevProps) {
		if (this.props.list !== prevProps.list) {
			this.setState({cards:this.props.list});
		}
	}

	render(){	
		const {isFetched, updateRating} = this.props;
			if(!isFetched || !this.state.cards) return null
			return (
							<div className= "card_container" onClick = {(e)=>this.handleEmptyClick(e)}>
								{this.state.cards.map((card,i) => 
									 <div 
										 className = "card-wrap"
										 data-answered={card.is_answered ? 'true' : ''} 
									 	 key={card.question_id}
										 onClick = {(e) => this.handleSelect(e,card.question_id)} 
										 onDoubleClick={(e) => this.handleDoubleClick(e, i)}>
											<Card
												handleMinusClick={updateRating.bind(null,card.question_id,false)}
												handlePlusClick={updateRating.bind(null,card.question_id,true)}
												id={card.question_id}
												index={i}
												isActive = {this.state.isActive}
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