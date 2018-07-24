import React from 'react';
import DatePickerContainer from '../containers/DatePickerContainer';
import LoadButtonContainer from '../containers/LoadButtonContainer';
import List from '../containers/ListContainer';
import '../styles.sass';

const App = () => (
  <div>
    <section className="left-sidebar">
      <DatePickerContainer />
      <LoadButtonContainer />
    </section>
    <List />
  </div>
);

export default App;
