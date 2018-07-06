import React from 'react';
import DatePicker from '../containers/DatePickerContainer';
import LoadButton from '../containers/LoadButtonContainer';
import List from '../containers/ListContainer';
import styles from '../styles.sass';

const App = () => (
  <div>
    <section className="left-sidebar">
      <DatePicker />
      <LoadButton />
    </section>
    <List />
  </div>
);

export default App;
