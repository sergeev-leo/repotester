import React from 'react';
import DatePicker from './datePickerContainer.js';
import LoadButton from './LoadButtonContainer.js';
import List from './ListContainer.js';

import store from './store.js';

const App = (props) => {

		return (
			<div className="appContainer">
				<section className="lefSidebar">
					<DatePicker/>
					<LoadButton/>
				</section>
				<List/>
			</div>
		)
	
}

export default App;